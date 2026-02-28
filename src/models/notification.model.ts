import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 }); //vanish after 3days default

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;