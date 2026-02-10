import dbConnect from '@/lib/db'; 
import User from '@/models/user.model';
import AdminDashboard from '@/components/LeaderDashboard';

export default async function LeadDashboardPage() {
  await dbConnect();

  // Fetch Users
  // .lean() converts Mongoose objects to plain JS objects (Optimization)
  const users = await User.find({})
    .select('name email institution department phone eventsRegistered')
    .lean();

  // Serialize Data
  // Next.js cannot pass MongoDB ObjectIDs directly to client components, so we convert them to strings.
  const serializedUsers = users.map((user: any) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    institution: user.institution,
    dept: user.department,
    phone: user.phone,
    eventsRegistered: user.eventsRegistered || ['--'], // Default to empty array if missing
  }));

  return (
    <main>
      <AdminDashboard users={serializedUsers} />
    </main>
  );
}