import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized: No session' },
        { status: 401 }
      )
    }

    // Use email instead of id, or make sure id exists
    const user = await User.findById(session.user.id).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: (error as any).message },
      { status: 500 }
    )
  }
}
