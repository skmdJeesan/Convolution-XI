import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadAllowlist extends Document {
  email: string;
  name: string; 
}

const LeadAllowlistSchema = new Schema<ILeadAllowlist>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

// Prevent model overwrite error in Next.js
const LeadAllowlist: Model<ILeadAllowlist> = mongoose.models.LeadAllowlist || mongoose.model<ILeadAllowlist>('LeadAllowlist', LeadAllowlistSchema);
export default LeadAllowlist;