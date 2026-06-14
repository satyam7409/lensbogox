import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    displayName: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avatarInitials: {
        type: String,
        default: "",
    },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: [Number], // [lng, lat]
    },
    pinCode: {
        type: String,
        required: true,
        default: "",
        trim: true,
    },
    areaName: {
        type: String,
        default: "",
        trim: true,
    },
    hasMembership: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastSeenAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.js.map