import { ApiError } from "../utils/APIError.js";
import Post from "../models/post.js";
import { ApiResponse } from "../utils/APIResponse.js";
import asyncHandler from "../utils/asynchandler.js";
export const createPost = asyncHandler(async (req, res) => {
    const alreadyPosted = await Post.findOne({ userId: req.userId, status: "pending" });
    if (alreadyPosted) {
        throw new ApiError(400, "Already have a post");
    }
    const { hasMembership, note, lat, lng, } = req.body;
    if (!lat || !lng)
        throw new ApiError(400, 'Location (lat, lng) is required');
    if (hasMembership === undefined)
        throw new ApiError(400, 'hasMembership is required');
    const post = await Post.create({
        userId: req.userId,
        hasMembership,
        note,
        areaName: req.userObj.areaName,
        pinCode: req.userObj.pinCode,
        location: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
        },
    });
    if (!post) {
        throw new ApiError(404, "Post is not creasted");
    }
    res.status(200).json(new ApiResponse(200, post, "Post created successfully"));
});
export const getPosts = asyncHandler(async (req, res) => {
    const radius = 5;
    const user = req.userObj;
    if (user == null || user.phone == null) {
        throw new ApiError(404, "Can;t find user");
    }
    if (!user?.location?.coordinates?.length) {
        throw new ApiError(400, "User location not set. Please update your profile.");
    }
    const [lng, lat] = user.location.coordinates;
    const posts = await Post.find({
        status: "pending",
        userId: { $ne: req.userId },
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
                $maxDistance: radius * 1000,
            },
        },
    }).select("_id areaName hasMembership note").populate("userId", "displayName");
    console.log("Selected Posts", posts);
    res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
});
//# sourceMappingURL=post.js.map