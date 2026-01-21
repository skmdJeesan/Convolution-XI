import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"; 

export async function POST(request: NextRequest) {
  try {
    const {name, email, password, phone, institution, depatment, year} = await request.json()
    await dbConnect()

    const userExists = await User.findOne({ email })
    if(userExists)
      return NextResponse.json({message: "User already exists"}, { status: 400 })

    if(password.length < 6)
      return NextResponse.json({message: "Password must be at least 6 characters"}, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({name, email, password: hashedPassword, phone, institution, depatment, year})
    await user.save()
    return NextResponse.json({message: "User created successfully", user}, { status: 201 })

  } catch (error) {
    return NextResponse.json({message: "Internal Server Error", error}, { status: 500 })
  }
}