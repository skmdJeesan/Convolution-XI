import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/user.model'; // Ensure you have your User model imported

// Force this route to always be dynamic (fresh data), not cached
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    await dbConnect();
    // Get the exact count
    const count = await User.countDocuments({});
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch count' }, { status: 500 });
  }
}