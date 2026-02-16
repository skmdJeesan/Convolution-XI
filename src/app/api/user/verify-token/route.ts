import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";

export async function POST(request: Request) {
  const { token } = await request.json();

  await dbConnect();

  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() }, // Check if not expired
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: "Email verified successfully" });
}