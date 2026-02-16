import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; 
import User from '@/models/user.model'; // Ensure filename matching (User vs user.model)
import LeadAllowlist from '@/models/lead.model'; // Ensure filename matching
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

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
      existingUser.managedEventId = allowedLead.assignedEvent;
      
      // If they provided a password, update it. 
      // If they left it blank (optional), keep the old one.
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
      }

      await existingUser.save();
      
      // Mark allowlist as used
      allowedLead.isRegistered = true; // Uncomment if you want to block re-entry
      await allowedLead.save();

      return NextResponse.json(
        { message: "Account verified. Redirecting..." },
        { status: 200 }
      );
    }

    // 3. NEW USER CREATION (If they never registered as a normal user first)
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'LEAD',
      managedEventId: allowedLead.assignedEvent,
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