import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await dbConnect();

        // ban
        const user = await User.findById(userId);
        
        if (user && user.institution && user.department && user.year) {
            const inst = user.institution.toLowerCase().replace(/\s+/g, "");
            const isJU = inst === "ju" || inst.includes("jadavpur");

            const dept = user.department.toLowerCase().replace(/\s+/g, "");
            const isEE = dept === "ee" || dept === "ele" || dept.includes("electrical");

            const yr = user.year.toUpperCase().replace(/\s+/g, "");
            const isUG3 = yr === "UG3";

            if (isJU && isEE && isUG3) {
                return NextResponse.json(
                    { message: "JU Electrical Ug3 is not allowed", invites: [] },
                    { status: 403 }
                );
            }
        }

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