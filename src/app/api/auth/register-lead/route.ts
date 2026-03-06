import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; 
import User from '@/models/user.model'; // Ensure filename matching (User vs user.model)
import LeadAllowlist from '@/models/lead.model'; // Ensure filename matching
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }
    
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
      if (existingUser.role !== 'LEAD') {
        existingUser.role = 'LEAD';
        await existingUser.save();
      }
      return NextResponse.json(
        { message: "Account verified and upgraded to Lead. Please log in." },
        { status: 200 }
      );
    }

    // Hash password for new user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
      name,
      email,
      password: hashedPassword,
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