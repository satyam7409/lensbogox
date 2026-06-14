import asyncHandler from "../utils/asynchandler.js";
import Deal from "../models/deal.js";
import Post from "../models/post.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { getIO } from "../socket/socket.js";
export const createDeal = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    if (!postId) {
        throw new ApiError(500, "No postID");
    }
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "No post found");
    }
    if (post.userId.toString() === req.userId) {
        throw new ApiError(400, "Cannot connect to your own post");
    }
    const existingDeal = await Deal.findOne({ postId: postId, joinerUserId: req.userId });
    if (existingDeal) {
        return res.status(200).json(new ApiResponse(200, existingDeal._id.toString(), "Deal already exists"));
    }
    const newDeal = await Deal.create({
        postId,
        hostUserId: post.userId,
        joinerUserId: req.userId
    });
    if (!newDeal) {
        throw new ApiError(500, "No newDeal Created");
    }
    const dealId = newDeal._id.toString();
    const hostId = post.userId.toString();
    getIO()?.to(`user:${hostId}`).emit("new_deal", {
        dealId,
        joinerId: req.userId,
    });
    res.status(200).json(new ApiResponse(200, dealId, "Deal id generated"));
});
export const getDeals = asyncHandler(async (req, res) => {
    // Bug 1 fixed — ! means throw when missing
    if (!req.userId)
        throw new ApiError(401, "Unauthorised");
    // Bug 2 fixed — $or finds deals where user is host OR joiner
    const deals = await Deal.find({
        $or: [
            { hostUserId: req.userId },
            { joinerUserId: req.userId },
        ],
    })
        .populate("hostUserId", "displayName avatarInitials hasMembership")
        .populate("joinerUserId", "displayName avatarInitials hasMembership")
        .populate("postId", "areaName hasMembership note")
        .sort({ updatedAt: -1 });
    // Bug 3 fixed — no null check, just return array (empty is fine)
    res.status(200).json(new ApiResponse(200, deals, "Deals fetched"));
});
//# sourceMappingURL=deal.js.map