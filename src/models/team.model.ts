import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "confirmed", // Auto-confirm for now as per reference logic
  },
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;
