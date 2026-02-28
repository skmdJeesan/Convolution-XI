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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    }
  }],
  // default pending untill user approves
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "pending", 
  },
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;