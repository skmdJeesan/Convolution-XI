import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        // frontend will send the team and user id of the person accepting
        const { teamId, userId } = await req.json();

        if (!teamId || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        // Find the team and populate the leader and members so we can get their emails
        const team = await Team.findById(teamId).populate("leader").populate("members.user");

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        //find the specific member in the array and update their status
        const memberIndex = team.members.findIndex((m: any) => m.user._id.toString() === userId);
        
        if (memberIndex === -1) {
            return NextResponse.json({ message: "You are not a member of this team" }, { status: 400 });
        }

        if (team.members[memberIndex].status === "accepted") {
            return NextResponse.json({ message: "You have already accepted this invite" }, { status: 400 });
        }

        const acceptingUser = team.members[memberIndex].user as any;

        // mark this specific user as accepted
        team.members[memberIndex].status = "accepted";
        await team.save();

        //add event to user's profile
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { eventsRegistered: team.eventName.toLowerCase() } }
        );

        await Notification.deleteOne({ 
            email: acceptingUser.email, 
            type: "TEAM_INVITE",
            message: { $regex: team.teamName }
        });

        const leader = team.leader as any;
        
        await Notification.create({
            email: leader.email,
            message: `<span class="font-bold text-fuchsia-400">${acceptingUser.name}</span> has accepted your invite to join <span class="font-bold text-cyan-400">${team.teamName}</span> for <span class="font-bold text-purple-500">${getFriendlyEventName(team.eventName)}</span>! 🎉`,
            type: "TEAM_UPDATE",
        });

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

                await transporter.sendMail({
                    from: `Support <${process.env.EMAIL_USER}>`,
                    to: leader.email,
                    subject: `invitation Accepted for ${getFriendlyEventName(team.eventName)}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Good news ${leader.name}! 🎉</h3>
                            <p><b>${acceptingUser.name}</b> (${acceptingUser.email}) has just accepted your invitation to join <b>${team.teamName}</b> for <b>${getFriendlyEventName(team.eventName)}</b>, Convolution26.</p>
                            <p>You can check your updated team status on your dashboard.</p>
                            <br/>
                            <a href="${baseUrl}/profile" style="display: inline-block; padding: 12px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Dashboard</a>
                        </div>
                    `
                });
            } catch (emailError: any) {
                console.error("Failed to send acceptance email to leader:", emailError.message);
            }
        }


        const allAccepted = team.members.every((m: any) => m.status === "accepted");
        const anyDeclined = team.members.some((m: any) => m.status === "declined");

        // everyone has accepted
        if (allAccepted && !anyDeclined) {
            team.status = "confirmed";
            await team.save();
            
            const allUser = [
                { email: leader.email, name: leader.name },
                ...team.members.map((m: any) => ({ email: m.user.email, name: m.user.name }))
            ];

            // clean up the leader's pending notification
            await Notification.deleteOne({
                email: leader.email,
                type: "TEAM_CREATE",
                message: { $regex: team.teamName }
            });

            const confirmationNotifications = allUser.map(obj => ({
                email: obj.email,
                message: `Yayyy! Team <span class="font-bold text-cyan-400">${team.teamName}</span> is officially confirmed for <span class="font-bold text-purple-500">${getFriendlyEventName(team.eventName)}</span> 🎉.`,
                type: "TEAM_CONFIRMED"
            }));
            await Notification.insertMany(confirmationNotifications);

            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    });

                    // send mail to all user
                    let gform = "";
                    const Event = team.eventName.toLowerCase();
                    if(Event==='aboltabol'){
                        gform = `<div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                            <p style="margin: 0 0 15px 0; line-height: 1.5;">Submit your abstract of your team's ideas through the google form given below before DEADLINE. This need to be submitted by the LEADER only.</p>
                            <a href="https://forms.gle/NoJqQ4Rtc47ZP9XM6." style="display: inline-block; padding: 10px 15px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Google Form</a>

                            <div style="padding: 15px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;">
                            <p style="margin: 0 0 10px 0; line-height: 1.5;"><b>Step 2:</b> Please join our official WhatsApp group for further updates, announcements.</p>
                            <a href="https://chat.whatsapp.com/FOhPzaV9HQ48EyHNbq68HS?mode=gi_t" style="display: inline-block; padding: 10px 15px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Join WhatsApp Group</a>
                        </div>
                        </div>`
                    }
                    else if(Event=== "eureka"){
                        gform = `<div style="padding: 15px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;">
                            <p style="margin: 0 0 10px 0; line-height: 1.5;"><b>Step 2:</b> Please join our official WhatsApp group for further updates, announcements.</p>
                            <a href="https://chat.whatsapp.com/FwbBE35ceUZEKXVT7oWkqV?mode=gi_t" style="display: inline-block; padding: 10px 15px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Join WhatsApp Group</a>
                        </div>`
                    }
                    const emailPromises = allUser.map(obj => {
                        return transporter.sendMail({
                            from: `Support <${process.env.EMAIL_USER}>`,
                            to: obj.email,
                            subject: `Team Confirmed! 🚀 ${getFriendlyEventName(team.eventName)}`,
                            html: `
                                <div style="font-family: Arial, sans-serif; color: #333;">
                                    <h3>Hello ${obj.name} 👋!</h3>
                                    <p>Great news! Everyone has accepted their invitations.</p>
                                    <p>Your team <b>"${team.teamName}"</b> is officially confirmed and registered for <b>${getFriendlyEventName(team.eventName)}</b>, Convolution26.</p>
                                    ${gform}
                                    <p>Best of luck for the competition!</p>
                                </div>
                            `
                        });
                    });

                    // execute all email promises at the same time
                    await Promise.all(emailPromises);

                } catch (e) {
                    console.error("Failed to send final confirmation emails", e);
                }
            }
        }

        return NextResponse.json(
            { message: "Invite accepted successfully!", teamConfirmed: allAccepted },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error accepting team invite:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}