import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure this path points to your auth config
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email"; 

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 400 });
    }

    // Generate NEW token 
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    user.verifyToken = verifyToken;
    user.verifyTokenExpiry = verifyTokenExpiry;
    await user.save();

    await sendVerificationEmail(user.email, verifyToken);

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}