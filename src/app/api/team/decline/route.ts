import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer"; 

export async function POST(req: NextRequest) {
    try {
        const { teamId, userId } = await req.json();

        if (!teamId || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        // find the team and populate the leader and members
        const team = await Team.findById(teamId).populate("leader").populate("members.user");

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        // find the specific member in the array
        const memberIndex = team.members.findIndex((m: any) => m.user._id.toString() === userId);
        
        if (memberIndex === -1) {
            return NextResponse.json({ message: "You are not a member of this team" }, { status: 400 });
        }

        const decliningUser = team.members[memberIndex].user as any;

        // remove the declined user from the team array completely
        team.members.splice(memberIndex, 1);
        
        const allRemainingAccepted = team.members.length === 0 || team.members.every((m: any) => m.status === "accepted");
        if (allRemainingAccepted && team.status === "pending") {
            team.status = "confirmed";
        }

        await team.save();
        await team.save();

        // securely remove the event from their profile just in case
        await User.findByIdAndUpdate(
            userId,
            { $pull: { eventsRegistered: team.eventName.toLowerCase() } }
        );

        // delete the pending notification for this user
        await Notification.deleteOne({ 
            email: decliningUser.email, 
            type: "TEAM_INVITE",
            message: { $regex: team.teamName }
        });

        // notify leader
        const leader = team.leader as any; 

        await Notification.deleteOne({
            email: leader.email,
            type: "TEAM_CREATE",
            message: { $regex: team.teamName }
        });
        await Notification.create({
            email: leader.email,
            message: `⚠️ Alert: ${decliningUser.name} has DECLINED your invite to join "${team.teamName}".`,
            type: "TEAM_DECLINED"
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
                    subject: `⚠️ Invite Declined: Action needed for ${team.teamName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Hello ${leader.name},</h3>
                            <p><b>${decliningUser.name}</b> has declined your invitation to join the team <b>"${team.teamName}"</b> for ${getFriendlyEventName(team.eventName)}.</p>
                            <p>Their spot has been freed up. Please log in to your dashboard to invite a replacement teammate if you need.</p>
                            <br/>
                            <a href="${baseUrl}/profile" style="padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                        </div>
                    `
                });
            } catch (e) {
                console.error("Failed to send decline alert email to leader", e);
            }
        }

        return NextResponse.json(
            { message: "You have successfully declined the team invite." },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error declining team invite:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}