import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  role: string;
  managedEventId: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: false, },
  phone: {type: String,required: true, },
  institution: { type: String, required: true, },
  department: { type: String, required: true, },
  year: { type: String, required: true, },
  image: { type: String, required: false, },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String, required: false, },
  verifyTokenExpiry: { type: Date, index: { expires: '0s' } },
  role: { type: String, enum: ['USER', 'LEAD',], default: 'USER' },
  managedEventId: { type: String }, // Optional: link to the event they lead
}, { timestamps: true });

const User =  mongoose.models?.User || mongoose.model("User", userSchema);
export default User;