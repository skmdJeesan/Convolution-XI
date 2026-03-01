import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { eventName, leaderId, leaderEmail, leaderName } = await req.json();

        // 1. Ensure it is a valid solo event
        const solo_events = ["algomaniac", "jutalks", "frames"];

        if (!solo_events.includes(eventName.toLowerCase())) {
            return NextResponse.json(
                { message: "This event does not support solo registration." },
                { status: 400 }
            );
        }

        // 2. For security (I emptied this so you can actually test the registrations!)
        const closed_events: string[] = ["algomaniac", "jutalks", "frames"]; 
        if (closed_events.includes(eventName.toLowerCase())) {
            return NextResponse.json(
                { message: `Registrations for ${getFriendlyEventName(eventName)} not started yet.` },
                { status: 403 }
            );
        }

        await dbConnect();

        // jutalks maximum seat 220
        if (eventName.toLowerCase() === "jutalks") {
            const jutalksRegistrations = await Team.countDocuments({
                eventName: "jutalks",
            });

            if (jutalksRegistrations >= 220) {
                return NextResponse.json(
                    { message: "Registrations for Jutalks have been closed as we have reached the maximum number of participants." },
                    { status: 400 }
                );
            }
        }

        if (!eventName || !leaderId || !leaderEmail || !leaderName) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const userExists = await User.findOne({ email: leaderEmail });
        if (!userExists) {
            return NextResponse.json(
                { message: "Signup on the website before registering for an event." },
                { status: 400 }
            );
        }

        // 🚀 FIX: Properly query the "members.user" path to avoid Mongoose CastErrors
        const existingTeam = await Team.findOne({
            eventName,
            $or: [
                { leader: leaderId },
                { "members.user": leaderId } 
            ],
        });

        if (existingTeam) {
            return NextResponse.json(
                { message: "You have already registered for this event." },
                { status: 400 }
            );
        }

        const team = await Team.create({
            teamName: leaderEmail,
            eventName,
            leader: leaderId,
            members: [],
            status: "confirmed"
        });

        // add to eventsRegistered
        await User.findByIdAndUpdate(
            leaderId,
            { $addToSet: { eventsRegistered: eventName.toLowerCase() } }
        );

        // send notification (Added user: leaderId in case your schema requires it)
        await Notification.create({
            user: leaderId, 
            email: leaderEmail,
            message: `Yayy! You have registered for "${getFriendlyEventName(eventName)} 🎉"`,
            type: "SOLO_REGISTRATION",
        });

        // mail send
        let emailSent = true;
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
                    to: leaderEmail,
                    subject: `Registration Confirmed: ${getFriendlyEventName(eventName)}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h3>Congratulations ${leaderName} 🎉!</h3>
                            <p>You have successfully registered for <b>${getFriendlyEventName(eventName)}</b>, Convolution26 as a solo participant!</p>
                            <p>We are excited to see you at the event. Keep an eye on your dashboard for any updates.</p>
                            <br/>
                            <a href="${baseUrl}/profile" style="padding: 10px 20px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                        </div>
                    `
                });
            } catch (emailError: any) {
                console.error("Failed to send email via Nodemailer:", emailError.message);
                emailSent = false;
            }
        } else {
            console.warn("EMAIL_USER or EMAIL_PASS not set, skipping email sending.");
            emailSent = false;
        }

        const responseMessage = emailSent
            ? "Solo registration successful."
            : "Solo registration successful. However, we couldn't send a confirmation email. Please contact the organizers for assistance.";

        return NextResponse.json(
            { message: responseMessage, team },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error during solo registration:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}