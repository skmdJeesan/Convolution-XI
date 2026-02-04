import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { getFriendlyEventName } from "@/lib/friendlyEventNames";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { eventName, leaderId, leaderEmail, leaderName } = await req.json();

        const solo_events = ["aboltabol", "algomaniac", "jutalks", "frames"];

        if (!solo_events.includes(eventName.toLowerCase())) {
            return NextResponse.json(
                { message: "This event does not support solo registration." },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if number to registrations for jutalks has crossed 220
        if (eventName.toLowerCase() === "jutalks") {
            const jutalksRegistrations = await Team.countDocuments({
                eventName: "jutalks",
            });

            if (jutalksRegistrations >= 220) {
                return NextResponse.json(
                    {
                        message:
                            "Registrations for Jutalks have been closed as we have reached the maximum number of participants.",
                    },
                    { status: 400 }
                );
            }
        }

        // Check if user exists
        const userExists = await User.findOne({ email: leaderEmail });

        // Note: Skipping emailVerified check as per current User model limitations
        if (!userExists) {
            return NextResponse.json({
                message: "Signup on the website before registering for an event."
            }, { status: 400 });
        }

        // Warm up email service
        if (process.env.EMAIL_URL) {
            axios
                .get(`${process.env.EMAIL_URL}`)
                .catch((err) =>
                    console.error("Failed to warm up email service:", err.message)
                );
        }

        // Input validation
        if (!eventName || !leaderId || !leaderEmail || !leaderName) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if the leader is already in a team for this event
        const existingTeam = await Team.findOne({
            eventName,
            $or: [
                { leader: leaderId },
                { members: leaderId } // Check if they are a member in any team
            ],
        });

        if (existingTeam) {
            return NextResponse.json(
                {
                    message: "You have already registered for this event.",
                },
                { status: 400 }
            );
        }

        // Create the solo team
        const team = await Team.create({
            teamName: leaderEmail, // Using email as team name for solo
            eventName,
            leader: leaderId,
            members: [], // No members for solo
        });

        // send notification to the user
        const notification = {
            email: leaderEmail,
            message: `Yay! You have registered for "${getFriendlyEventName(
                eventName
            )}"`,
            type: "SOLO_REGISTRATION",
        };

        await Notification.create(notification);

        // Send confirmation email to the leader
        let emailSent = true;
        if (process.env.EMAIL_URL) {
            try {
                await axios.post(`${process.env.EMAIL_URL}/api/event`, {
                    to: leaderEmail,
                    subject: getFriendlyEventName(eventName),
                    name: leaderName,
                    eventName,
                    teamName: leaderName,
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
            ? "Solo registration successful."
            : "Solo registration successful. However, we couldn't send a confirmation email. Please contact the organizers for assistance.";

        return NextResponse.json(
            {
                message: responseMessage,
                team,
            },
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
