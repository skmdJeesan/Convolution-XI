import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await dbConnect();

        //find the team where the user is in pending and also the team itself is pending
        const pendingTeams = await Team.find({
            members: {
                $elemMatch: { user: userId, status: "pending" }
            },
            status: "pending" 
        }).populate("leader", "name email");

        return NextResponse.json({ invites: pendingTeams }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching invites:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}