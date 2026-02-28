import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model"; // Added this to update the user's profile
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer"; // 🚀 Replaced axios with nodemailer

export async function POST(req: NextRequest) {
    try {
        // frontend will send the Team ID and the User ID of the person accepting
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

        // Mark this specific user as accepted
        team.members[memberIndex].status = "accepted";
        await team.save(); // Save the individual status

        // 👉 Add the event to this user's profile so they get the accepted badge
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { eventsRegistered: team.eventName.toLowerCase() } }
        );


        await Notification.deleteOne({ 
            email: acceptingUser.email, 
            type: "TEAM_INVITE",
            message: { $regex: team.teamName }
        });

        // are there any pending members left?
        const allAccepted = team.members.every((m: any) => m.status === "accepted");
        const anyDeclined = team.members.some((m: any) => m.status === "declined");

        // If everyone has accepted and nobody declined!
        if (allAccepted && !anyDeclined) {
            // Upgrade the whole team to confirmed!
            team.status = "confirmed";
            await team.save();

            const leader = team.leader as any; // Populated user object
            await Notification.deleteOne({
                email: leader.email,
                type: "TEAM_CREATE",
                message: { $regex: team.teamName }
            });

            await Notification.create({
                email: leader.email,
                message: `Yayy! Congratulations, Team "${team.teamName}" is officially confirmed for ${getFriendlyEventName(team.eventName)} 🎉.`,
                type: "TEAM_CONFIRMED"
            });

            // 🚀 Send the final email to the Leader using Nodemailer
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    });

                    await transporter.sendMail({
                        from: `Support <${process.env.EMAIL_USER}>`,
                        to: leader.email,
                        subject: `Team Confirmed! 🚀 ${getFriendlyEventName(team.eventName)}`,
                        html: `
                            <div style="font-family: Arial, sans-serif; color: #333;">
                                <h3>Hello ${leader.name},</h3>
                                <p>Great news! Everyone has accepted their invitations.</p>
                                <p>Your team <b>"${team.teamName}"</b> is officially confirmed and registered for <b>${getFriendlyEventName(team.eventName)}</b>.</p>
                                <p>Good luck in the competition!</p>
                            </div>
                        `
                    });
                } catch (e) {
                    console.error("Failed to send final confirmation email", e);
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