import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });

        await dbConnect();

        // Find teams where the user is either the leader or accepted member
        const myTeams = await Team.find({
            $or: [
                { leader: userId },
                { members: { $elemMatch: { user: userId, status: "accepted" } } }
            ]
        }).populate("leader", "name email")
        .populate("members.user", "name email");

        return NextResponse.json({ teams: myTeams }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching my teams:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}