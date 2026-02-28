import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadAllowlist extends Document {
  email: string;
  name: string;
  assignedEvent: string; 
  isRegistered: boolean; 
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