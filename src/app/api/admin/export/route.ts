import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import Team from "@/models/team.model";

export const dynamic = 'force-dynamic';

// Helper function to safely format strings for CSV
const escapeCSV = (value: any) => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""'); // Escape double quotes
    return `"${str}"`; // Wrap in quotes to handle commas and newlines
};

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        const searchParams = req.nextUrl.searchParams;
        const type = searchParams.get("type"); // 'users', 'solo', 'team'
        const eventName = searchParams.get("event")?.toLowerCase();

        let csvData = "";
        let filename = "export.csv";

        if (type === "users") {
        //    total overview
            const users = await User.find({}).sort({ createdAt: -1 });
            
            const headers = ["Username", "User ID", "Institute", "Year", "Department", "Email", "Contact", "Registered In Any Event"];
            
            const rows = users.map(u => [
                u.name,
                u._id?.toString() || "",
                u.institution,
                u.year,
                u.department,
                u.email,
                u.phone,
                u.eventsRegistered && u.eventsRegistered.length > 0 ? "Yes" : "No"
            ]);

            csvData = [headers.map(escapeCSV).join(","), ...rows.map(row => row.map(escapeCSV).join(","))].join("\n");
            filename = "All_Users_Overview.csv";

        } else if (type === "solo" && eventName) {
            // solo
            const users = await User.find({ eventsRegistered: eventName }).sort({ createdAt: -1 });
            
            // Exactly the same details as overview
            const headers = ["Username", "User ID", "Institute", "Year", "Department", "Email", "Contact", "Registered In Any Event"];
            
            const rows = users.map(u => [
                u.name,
                u._id?.toString() || "",
                u.institution,
                u.year,
                u.department,
                u.email,
                u.phone,
                "Yes" // If they are in this list, they are registered
            ]);

            csvData = [headers.map(escapeCSV).join(","), ...rows.map(row => row.map(escapeCSV).join(","))].join("\n");
            filename = `${eventName}_Solo_Registrations.csv`;

        } else if (type === "team" && eventName) {
        //    team events
            const teams = await Team.find({ eventName: eventName })
                .populate("leader", "name email phone institution department year _id")
                .populate("members.user", "name email phone institution department year _id")
                .sort({ createdAt: -1 });

            // Using a flattened structure where each row represents ONE person in a team
            const headers = [
                "Team Name", "Team Status", "Role", "Invite Status", 
                "Username", "User ID", "Institute", "Year", "Department", "Email", "Contact"
            ];

            const rows: any[][] = [];

            teams.forEach(t => {
                const teamName = t.teamName;
                const teamStatus = t.status; // 'pending' or 'confirmed'

                // Leader's Row
                const leader = t.leader as any;
                if (leader) {
                    rows.push([
                        teamName, 
                        teamStatus, 
                        "Leader", 
                        "Accepted", // Leader automatically accepts by creating the team
                        leader.name, 
                        leader._id?.toString() || "", 
                        leader.institution, 
                        leader.year, 
                        leader.department, 
                        leader.email, 
                        leader.phone
                    ]);
                }

                // Row for each Member
                if (t.members && t.members.length > 0) {
                    t.members.forEach((m: any) => {
                        const memberUser = m.user;
                        if (memberUser) {
                            rows.push([
                                teamName, 
                                teamStatus, 
                                "Member", 
                                m.status, // 'pending', 'accepted', or 'declined'
                                memberUser.name, 
                                memberUser._id?.toString() || "", 
                                memberUser.institution, 
                                memberUser.year, 
                                memberUser.department, 
                                memberUser.email, 
                                memberUser.phone
                            ]);
                        }
                    });
                }
            });

            csvData = [headers.map(escapeCSV).join(","), ...rows.map(row => row.map(escapeCSV).join(","))].join("\n");
            filename = `${eventName}_Team_Registrations.csv`;

        } else {
            return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
        }

        // Return the CSV file directly to the browser
        return new NextResponse(csvData, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error("Export Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}