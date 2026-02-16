import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import axios from "axios";

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

        // Connect to DB
        await dbConnect();

        // Warm up email service
        if (process.env.EMAIL_URL) {
            axios
                .get(`${process.env.EMAIL_URL}`)
                .catch((err) =>
                    console.error("Failed to warm up email service:", err.message)
                );
        }

        // Input validation
        if (
            !teamName ||
            !eventName ||
            !leaderId ||
            !leaderEmail ||
            !Array.isArray(teamMembers)
        ) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // check if leaderEmail is same as any of the teamMembers
        if (teamMembers.includes(leaderEmail)) {
            return NextResponse.json(
                {
                    message:
                        "You cannot add your name as a member while registering as a Leader",
                },
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
                {
                    message:
                        "Duplicate emails found in team members or leader. All emails should be unique",
                },
                { status: 400 }
            );
        }

        // Fetch users from the database
        // Mongoose: find users where email is in allMembers list
        const users = await User.find({
            email: { $in: allMembers }
        });

        // Map existing emails
        const existingEmails = users.map((user) => user.email);
        const nonExistingUsers = allMembers.filter(
            (email) => !existingEmails.includes(email)
        );

        // NOTE: existing User model does not have emailVerified, so skipping that check.

        if (nonExistingUsers.length > 0) {
            return NextResponse.json(
                {
                    message: `The following users have not signed up on the website: ${nonExistingUsers.join(
                        ", "
                    )}`,
                },
                { status: 400 }
            );
        }

        // Check if the leader or any member is already in a team for this event
        // Mongoose query:
        // Look for a team where eventName matches AND
        // ( leaderId matches OR members includes any of the found user IDs )

        // First, let's get the ObjectIds of the members to query efficiently
        const allMemberIds = users.map(u => u._id);

        const existingTeams = await Team.find({
            eventName,
            $or: [
                { leader: leaderId }, // leader is the leader of another team
                { members: { $in: allMemberIds } }, // any of the members are in members list
                // Note: We also need to check if the current leader is a *member* of another team 
                // or if any current member is a *leader* of another team.
                // The original prisma query:
                // OR: [ { leaderId }, { members: { some: { email: { in: allMembers } } } } ]
                // This implicitly checks if the leaderId is a leader.
                // But we probably need to check if ANY of our people are involved in ANY way.
                // Let's stick to the logic: "Are any of these people (allMembers) present in any team for this event?"
                { leader: { $in: allMemberIds } }, // Is any of our people a leader?
                { members: { $in: allMemberIds } } // Is any of our people a member?
            ]
        }).populate('members');

        if (existingTeams.length > 0) {
            // If any team is found, it means someone is already registered.
            // We can just fail fast or try to identify who it is.
            // For simplicity, let's just return a generic message or try to match the Prisma logic's specificity if easy.

            return NextResponse.json(
                {
                    message: "One or more members are already part of a team for this event.",
                },
                { status: 400 }
            );
        }

        // Ensure team size doesn't exceed maxSize
        const maxSize = 5; // Reference code says 5 here, but earlier checked > 6. Sticking to logic.
        if (teamMembers.length + 1 > maxSize) {
            return NextResponse.json(
                { message: `Team size cannot exceed ${maxSize}` },
                { status: 400 }
            );
        }

        // Determine the user objects for leader and members to save references
        // We already have 'users' array which has everyone.
        // Filter out the members to store in 'members' field (excluding leader)
        // The reference code stores only members in 'members' relation, and leader in 'leader'.

        const memberUsers = users.filter(u => u.email !== leaderEmail);
        const memberIds = memberUsers.map(u => u._id);

        // Create the team
        const team = await Team.create({
            teamName,
            eventName,
            leader: leaderId,
            members: memberIds,
        });

        // Notify team members
        const notificationData = teamMembers.map((email: string) => ({
            email,
            message: `You are now part of the team "${teamName}" for the event "${getFriendlyEventName(
                eventName
            )}".`,
            type: "TEAM_INVITE",
        }));

        // Notify leader
        notificationData.push({
            email: leaderEmail,
            message: `Yay! Team "${teamName}" has been created successfully for the event "${getFriendlyEventName(
                eventName
            )}".`,
            type: "TEAM_CREATE",
        });

        await Notification.insertMany(notificationData);

        // Send email to the leader
        let emailSent = true;
        if (process.env.EMAIL_URL) {
            try {
                await axios.post(`${process.env.EMAIL_URL}/api/event`, {
                    to: leaderEmail,
                    subject: `${getFriendlyEventName(eventName)}`,
                    name: leaderName,
                    eventName,
                    teamName,
                });
            } catch (emailError: any) {
                console.error("Failed to send email:", emailError.message);
                emailSent = false;
            }
        } else {
            console.warn("EMAIL_URL not set, skipping email sending.");
            emailSent = false;
        }

        const responseMessage = emailSent
            ? "Team registration successful."
            : "Team registration successful. However, we couldn't send a confirmation email. Please contact the organizers for assistance.";

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
