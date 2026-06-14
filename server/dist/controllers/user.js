import User from "../models/user.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import admin from "../config/firebase.js";
export const login = asyncHandler(async (req, res) => {
    const { idToken, displayName, phone, location, pincode, areaName } = req.body;
    console.log("data", req.body);
    if (!idToken) {
        throw new ApiError(404, "Token not found");
    }
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded) {
        throw new ApiError(404, "Token can't be decoded");
    }
    const avatarInitials = displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    const user = await User.findOneAndUpdate({ firebaseUid: decoded.uid }, {
        $set: {
            firebaseUid: decoded.uid,
            displayName: displayName,
            phone: phone,
            pinCode: pincode,
            location: {
                type: "Point",
                coordinates: [location[0], location[1]],
            },
            areaName: areaName,
            avatarInitials,
        },
    }, { upsert: true, new: true });
    if (!user) {
        throw new ApiError(404, "User can't updated");
    }
    res.status(200).json(new ApiResponse(200, user, "User created successfully"));
});
//# sourceMappingURL=user.js.map