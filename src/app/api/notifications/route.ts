import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Notification from "@/models/notification.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized: No session' }, { status: 401 });
    }

    // Fetch notifications for this user's email, newest first
    const notifications = await Notification.find({ email: session.user.email }).sort({ createdAt: -1 });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error('Notification API error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as any).message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Find ALL unread notifications for user and change read to true
    await Notification.updateMany(
      { email: session.user.email, read: false },
      { $set: { read: true } }
    );

    return NextResponse.json({ message: 'Marked as read' }, { status: 200 });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as any).message },
      { status: 500 }
    );
  }
}