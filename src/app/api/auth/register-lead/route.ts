import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; 
import User from '@/models/user.model'; // Ensure filename matching (User vs user.model)
import LeadAllowlist from '@/models/lead.model'; // Ensure filename matching
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    await dbConnect();
    // 1. Check Allowlist
    const allowedLead = await LeadAllowlist.findOne({ email });
    if (!allowedLead) {
      return NextResponse.json(
        { message: "Access Denied. Email not authorized." },
        { status: 403 }
      );
    }
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // UPGRADE EXISTING USER
      existingUser.role = 'LEAD';
      await existingUser.save();
      await allowedLead.save();
      return NextResponse.json(
        { message: "Account verified. Redirecting..." },
        { status: 200 }
      );
    }


    await User.create({
      name,
      email,
      role: 'LEAD',
    });

    // allowedLead.isRegistered = true;
    // await allowedLead.save();

    return NextResponse.json({ message: "Lead registered!" }, { status: 201 });

  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}