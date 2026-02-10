// app/lead-dashboard/page.tsx
import dbConnect from '@/lib/db'; // Ensure path is correct
import User from '@/models/user.model'; // Ensure path matches your model file
import AdminDashboard from '@/components/LeaderDashboard';

// This function runs on the SERVER
export default async function LeadDashboardPage() {
  // 1. Connect to Database
  await dbConnect();

  // 2. Fetch Users
  // .lean() converts Mongoose objects to plain JS objects (Optimization)
  const users = await User.find({})
    .select('name email institution department phone eventsRegistered')
    .lean();

  // 3. Serialize Data
  // Next.js cannot pass MongoDB ObjectIDs directly to client components,
  // so we convert them to strings.
  const serializedUsers = users.map((user: any) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    institution: user.institution,
    dept: user.department,
    phone: user.phone,
    eventsRegistered: user.eventsRegistered || [], // Default to empty array if missing
  }));

  // 4. Render the Client Component with Data
  return (
    <main>
      <AdminDashboard users={serializedUsers} />
    </main>
  );
}