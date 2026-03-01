import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const {
            teamName,
            eventName,
            leaderId,
            members: teamMembers,
            leaderEmail,
            leaderName,
        } = await req.json();

        const team_events = [
            "sparkhack",
            "decisia",
            "aboltabol",
            "circuistics",
            "eureka",
            "inquizzitive",
        ];

        if (!team_events.includes(eventName.toLowerCase())) {
            return NextResponse.json(
                { message: "This event does not support team registration." },
                { status: 400 }
            );
        }

        // for security
        const closed_events: string[] = ["circuistics","decisia", "sparkhack", "aboltabol", "eureka", "inquizzitive"]; 
        
        if (closed_events.includes(eventName.toLowerCase())) {
            return NextResponse.json(
                { message: `Registrations for ${getFriendlyEventName(eventName)} not yet started.` }, 
                { status: 403 }
            );
        }

        // Connect to DB
        await dbConnect();

        // Input validation
        if (!teamName || !eventName || !leaderId || !leaderEmail || !Array.isArray(teamMembers)) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // check if leaderEmail is same as any of the teamMembers
        if (teamMembers.includes(leaderEmail)) {
            return NextResponse.json(
                { message: "You cannot add your name as a member while registering as a Leader" },
                { status: 400 }
            );
        }

        // Combine leader and team members for validation
        const allMembers = [...teamMembers, leaderEmail];

        // Check to ensure team size is within the limits
        if (allMembers.length > 6) {
            return NextResponse.json(
                { message: "Team size not supported" },
                { status: 400 }
            );
        }

        // Check if all of the emails are unique
        const uniqueMembers = new Set(allMembers);
        if (uniqueMembers.size !== allMembers.length) {
            return NextResponse.json(
                { message: "Duplicate emails found in team members or leader. All emails should be unique" },
                { status: 400 }
            );
        }

        // Fetch users from the database
        const users = await User.find({
            email: { $in: allMembers }
        });

        // Map existing emails
        const existingEmails = users.map((user) => user.email);
        const nonExistingUsers = allMembers.filter(
            (email) => !existingEmails.includes(email)
        );

        if (nonExistingUsers.length > 0) {
            return NextResponse.json(
                { message: `The following users have not signed up on the website: ${nonExistingUsers.join(", ")}` },
                { status: 400 }
            );
        }

        const allMemberIds = users.map(u => u._id);

        const existingTeams = await Team.find({
            eventName,
            $or: [
                { leader: leaderId },
                { members: { $in: allMemberIds } },
                { leader: { $in: allMemberIds } },
                { members: { $in: allMemberIds } }
            ]
        }).populate('members');

        if (existingTeams.length > 0) {
            return NextResponse.json(
                { message: "One or more members are already part of a team for this event." },
                { status: 400 }
            );
        }

        // Ensure team size doesn't exceed maxSize
        const maxSize = 5;
        if (teamMembers.length + 1 > maxSize) {
            return NextResponse.json(
                { message: `Team size cannot exceed ${maxSize}` },
                { status: 400 }
            );
        }

        // Determine the user objects for leader and members to save references
        const memberUsers = users.filter((u) => u.email !== leaderEmail);
        
        // structure members with pending status
        const pendingMembers = memberUsers.map((u) => ({
            user: u._id,
            status: "pending",
        }));

        const initialStatus = pendingMembers.length === 0 ? "confirmed" : "pending";

        // create team
        const team = await Team.create({
            teamName,
            eventName,
            leader: leaderId,
            members: pendingMembers,
            status: initialStatus 
        });
        
        await User.findByIdAndUpdate(
            leaderId,
            { $addToSet: { eventsRegistered: eventName.toLowerCase() } }
        );

        const leaderNotificationMsg = pendingMembers.length === 0
            ? `Yayyy! Registration Confirmed 🎉! You have successfully registered for ${getFriendlyEventName(eventName)}.`
            : `Hurray, Team "${teamName}" created! We are waiting for your teammates to accept their invites.`;

        const notificationData = memberUsers.map((u) => ({
            email: u.email,
            message: `${leaderName} has invited you to join team "${teamName}" for ${getFriendlyEventName(eventName)}. Please go to your dashboard to Accept or Decline.`,
            type: "TEAM_INVITE",
        }));

        notificationData.push({
            email: leaderEmail,
            message: leaderNotificationMsg,
            type: "TEAM_CREATE",
        });

        await Notification.insertMany(notificationData);

        let emailsSent = true;
        
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const baseUrl = process.env.APP_URL || "https://www.convolutionjuee.com";

                const leaderEmailSubject = pendingMembers.length === 0
                    ? `Registration Confirmed! - ${getFriendlyEventName(eventName)}`
                    : `Team Created! Waiting for other members to accept requests - ${getFriendlyEventName(eventName)}`;

                const leaderEmailHtml = pendingMembers.length === 0
                    ? `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Congratulations ${leaderName} 🎉!</h3>
                            <p>Your team <b>"${teamName}"</b> has been successfully registered and confirmed for <b>${getFriendlyEventName(eventName)}</b>, Convolution26.</p>
                            <p>We are excited to see you at the event. Keep an eye on your dashboard for any updates.</p>
                            <br/>
                            <a href="${baseUrl}/profile" style="padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                        </div>
                    `
                    : `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Heyy ${leaderName},</h3>
                            <p>Your team <b>"${teamName}"</b> has been successfully initiated for <b>${getFriendlyEventName(eventName)}</b>.</p>
                            <p>We have sent invitations to your teammates. Your team will be officially confirmed once everyone accepts their invites.</p>
                            <br/>
                            <a href="${baseUrl}/profile" style="padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                        </div>
                    `;

                // send email to the Leader
                const leaderEmailPromise = transporter.sendMail({
                    from: `Support <${process.env.EMAIL_USER}>`,
                    to: leaderEmail,
                    subject: leaderEmailSubject,
                    html: leaderEmailHtml
                });

                // send invite emails to all teammates
                const memberEmailPromises = memberUsers.map(u => 
                    transporter.sendMail({
                        from: `Support <${process.env.EMAIL_USER}>`,
                        to: u.email,
                        subject: `ACTION REQUIRED: ${leaderName} invited you to join a team for ${getFriendlyEventName(eventName)}, Convolution26!`,
                        html: `
                            <div style="font-family: Arial, sans-serif; color: #333;">
                                <h3>Heyy ${u.name},</h3>
                                <p><b>${leaderName}</b> has invited you to join the team <b>"${teamName}"</b> for <b>${getFriendlyEventName(eventName)}</b>.</p>
                                <p>To secure your spot, please log in to your dashboard and Accept or Decline this invitation.</p>
                                <br/>
                                <a href="${baseUrl}/profile" style="padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Invite</a>
                            </div>
                        `
                    })
                );

                await Promise.all([leaderEmailPromise, ...memberEmailPromises]);

            } catch (emailError: any) {
                console.error("Failed to send Nodemailer emails:", emailError.message);
                emailsSent = false;
            }
        } else {
            console.warn("EMAIL_USER or EMAIL_PASS not set in .env. Skipping emails.");
            emailsSent = false;
        }

        let responseMessage = "";
        if (emailsSent) {
            responseMessage = pendingMembers.length === 0
                ? "Registration confirmed!"
                : "Team created! Invites have been sent to your teammates.";
        } else {
            responseMessage = pendingMembers.length === 0
                ? "Registration confirmed! (Email failed to send)"
                : "Team created, but there was an issue sending the email invites. Members can still accept via their dashboard.";
        }

        return NextResponse.json(
            {
                message: responseMessage,
                team,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating team:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}