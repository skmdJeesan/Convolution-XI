import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { teamId, leaderId, newMemberEmail } = await req.json();

        if (!teamId || !leaderId || !newMemberEmail) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        // find team and verify the user is actually the leader
        const team = await Team.findById(teamId).populate("leader");
        if (!team) return NextResponse.json({ message: "Team not found" }, { status: 404 });
        
        if (team.leader._id.toString() !== leaderId) {
            return NextResponse.json({ message: "Only the team leader can add new members." }, { status: 403 });
        }

        // closed events for security
        const closed_events: string[] = ["circuistics","decisia", "sparkhack", "eureka", "inquizzitive"]; 
        if (closed_events.includes(team.eventName.toLowerCase())) {
            return NextResponse.json({ message: `Registrations for ${getFriendlyEventName(team.eventName)} not started yet.` }, { status: 403 });
        }

        // max limits of events
        const maxLimits: { [key: string]: number } = {
            "decisia": 5,
            "sparkhack": 4,
            "aboltabol": 4,
            "circuistics": 4,
            "eureka": 4,
            "inquizzitive": 4,
        };
        const maxSize = maxLimits[team.eventName.toLowerCase()] || 5; 
        
        if (team.members.length + 1 >= maxSize) {
            return NextResponse.json({ message: `Team is already at the maximum capacity of ${maxSize}.` }, { status: 400 });
        }

        // find the new user by email
        const newUser = await User.findOne({ email: newMemberEmail });
        if (!newUser) return NextResponse.json({ message: "This user has not registered on the website yet." }, { status: 400 });

        // check if they are already in the team
        const isAlreadyInTeam = team.members.some((m: any) => m.user.toString() === newUser._id.toString());
        if (isAlreadyInTeam || team.leader.email === newMemberEmail) {
            return NextResponse.json({ message: "This user is already in your team." }, { status: 400 });
        }

        // check if they are in another team for this event
        const existingTeams = await Team.find({
            eventName: team.eventName,
            $or: [{ leader: newUser._id }, { members: { $elemMatch: { user: newUser._id } } }]
        });
        if (existingTeams.length > 0) return NextResponse.json({ message: "This user is already part of another team for this event." }, { status: 400 });

        team.members.push({ user: newUser._id, status: "pending" });
        team.status = "pending"; //whole team will fall in pending
        await team.save();

        // notification
        await Notification.create({
            email: newMemberEmail,
            message: `<span class="font-bold text-fuchsia-400">${team.leader.name}</span> has invited you to join team <span class="font-bold text-cyan-400">${team.teamName}</span> for <span class="font-bold text-purple-500">${getFriendlyEventName(team.eventName)}</span>. Go to your dashboard to <span class="font-bold">Accept</span> or <span class="font-bold">Decline</span>.`,
            type: "TEAM_INVITE",
        });

        // email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
                });
                const baseUrl = process.env.APP_URL || "https://www.convolutionjuee.com";
                await transporter.sendMail({
                    from: `Support <${process.env.EMAIL_USER}>`,
                    to: newMemberEmail,
                    subject: `ACTION REQUIRED: ${team.leader.name} invited you to a team!`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Hello ${newUser.name} 👋,</h3>
                            <p><b>${team.leader.name}</b> has invited you to join the team <b>"${team.teamName}"</b> for <b>${getFriendlyEventName(team.eventName)}</b>.</p>
                            <p>To secure your spot, log in to your dashboard and Accept or Decline this invitation.</p>
                            <br/><a href="${baseUrl}/profile" style="display: inline-block; padding: 12px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Invite</a>
                        </div>
                    `
                });
            } catch (e) {
                console.error("Failed to send add-member email:", e);
            }
        }

        return NextResponse.json({ message: "Invitation sent successfully!" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}