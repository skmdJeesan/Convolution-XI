import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {name, email, phone, institution, department, year} = await request.json()
    await dbConnect()
    const user = await User.findOneAndUpdate({email},
      { name, phone, institution, department, year },
      { new: true }
    )
    await user?.save()
    return NextResponse.json({message: "Profile Updated successfully", user}, { status: 200 })
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error", error}, { status: 500 })
  }
}