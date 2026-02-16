import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadAllowlist extends Document {
  email: string;
  name: string;
  assignedEvent: string; // The event they are leading (e.g., "Robowars")
  isRegistered: boolean; // To track if they have claimed their account
}

const LeadAllowlistSchema = new Schema<ILeadAllowlist>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  assignedEvent: { type: String, required: true },
  isRegistered: { type: Boolean, default: false },
});

// Prevent model overwrite error in Next.js
const LeadAllowlist: Model<ILeadAllowlist> = mongoose.models.LeadAllowlist || mongoose.model<ILeadAllowlist>('LeadAllowlist', LeadAllowlistSchema);
export default LeadAllowlist;