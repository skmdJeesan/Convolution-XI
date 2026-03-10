import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import Team from "@/models/team.model";

export const dynamic = 'force-dynamic'; 

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // total users
        const totalUsers = await User.countDocuments({ isVerified: true });
        const registeredUsers = await User.countDocuments({
            isVerified: true,
            eventsRegistered: { $exists: true, $not: { $size: 0 } }
        });

        // ju vs non-ju
        const juRegex = /^\s*(ju|jadavpur university)\s*$/i;
        const totalJUUsers = await User.countDocuments({
            isVerified: true,
            institution: { $regex: juRegex }
        });
        const totalOtherUsers = totalUsers - totalJUUsers;

        // team stats
        const teamStats = await Team.aggregate([
            {
                $group: {
                    _id: "$eventName",
                    totalTeams: { $sum: 1 },
                    totalUsers: { $sum: { $add: [{ $size: "$members" }, 1] } } 
                }
            }
        ]);

        const allRegistrations = await User.aggregate([
            { $match: { isVerified: true } },
            { $unwind: "$eventsRegistered" },
            {
                $project: {
                    event: "$eventsRegistered",
                    isJU: {
                        $in: [
                            { $trim: { input: { $toLower: { $ifNull: ["$institution", ""] } } } },
                            ["ju", "jadavpur university"]
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$event",
                    totalRegistrations: { $sum: 1 },
                    juCount: { $sum: { $cond: ["$isJU", 1, 0] } },
                    otherCount: { $sum: { $cond: ["$isJU", 0, 1] } }
                }
            }
        ]);

        // Solo Events
        const soloEventKeys = ["algomaniac", "24frames", "frames", "jutalks"];

        const soloEventsData = allRegistrations
            .filter(event => soloEventKeys.includes(event._id.toLowerCase()))
            .map(e => {
                const idLower = e._id.toLowerCase();
                let displayName = e._id.charAt(0).toUpperCase() + e._id.slice(1);
                
                if (idLower === 'frames' || idLower === '24frames') displayName = '24Frames';
                if (idLower === 'jutalks') displayName = 'JU Talks';
                if (idLower === 'algomaniac') displayName = 'Algomaniac';

                return {
                    id: e._id,
                    name: displayName,
                    totalRegistrations: e.totalRegistrations,
                    juCount: e.juCount,
                    otherCount: e.otherCount
                };
            });

        const teamEventsData = teamStats
            .filter(event => !soloEventKeys.includes(event._id.toLowerCase()))
            .map(e => {
                const idLower = e._id.toLowerCase();
                let displayName = e._id.charAt(0).toUpperCase() + e._id.slice(1);
                
                if (idLower === 'aboltabol') displayName = 'AbolTabol';
                
                return {
                    id: e._id,
                    name: displayName,
                    totalTeams: e.totalTeams,
                    totalUsers: e.totalUsers
                };
            });

        return NextResponse.json({
            totalUsers,
            registeredUsers,
            notRegisteredUsers: totalUsers - registeredUsers,
            totalJUUsers,
            totalOtherUsers,
            soloEvents: soloEventsData,
            teamEvents: teamEventsData
        }, { status: 200 });

    } catch (error: any) {
        console.error("Dashboard Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}