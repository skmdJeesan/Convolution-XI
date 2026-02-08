import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Your DB connection helper
import User from '@/models/user.model';
import LeadAllowlist from '@/models/lead.model';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await dbConnect();

    // 1. Check if this email is in the Lead Allowlist
    const allowedLead = await LeadAllowlist.findOne({ email });

    if (!allowedLead) {
      return NextResponse.json(
        { message: "Access Denied. This email is not authorized to be a Lead." },
        { status: 403 }
      );
    }

    if (allowedLead.isRegistered) {
      return NextResponse.json(
        { message: "This Lead account has already been claimed." },
        { status: 400 }
      );
    }

    // 2. Check if a User account already exists (standard duplicate check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update their role and link the event
      existingUser.role = 'LEAD';
      existingUser.managedEventId = allowedLead.assignedEvent;

      // Optional: Update password if they provided a new one, 
      // otherwise keep their old password.
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
      }

      await existingUser.save();

      // Mark the invitation as used
      allowedLead.isRegistered = true;
      await allowedLead.save();

      return NextResponse.json(
        { message: "Existing account upgraded to Lead successfully!" },
        { status: 200 }
      );
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the User with 'LEAD' role
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'LEAD',
      managedEventId: allowedLead.assignedEvent, // Link them to their event automatically
    });

    // 5. Mark the invitation as used
    allowedLead.isRegistered = true;
    await allowedLead.save();

    return NextResponse.json({ message: "Lead registered successfully!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}