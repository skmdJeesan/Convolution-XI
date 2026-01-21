import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if(!session || !session.user.email || !session.user.id) {
      return NextResponse.json({
        message: 'user does not have session'
      }, { status: 400})
    }
    
    const user = await User.findById(session.user.id).select('-password')
    if(!user) {
      return NextResponse.json({
        message: 'user not found'
      }, { status: 404})
    }
    return NextResponse.json(user, {status: 200})
  } catch (error) {
    return NextResponse.json( {message: 'user error', error}, {status: 500})
  }
}
