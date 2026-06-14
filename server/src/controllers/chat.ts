import asyncHandler from "../utils/asynchandler.js";
import { Request, Response } from "express";
import Deal from "../models/deal.js";
import { ApiError } from "../utils/APIError.js";
import Message from "../models/message.js";
import { ApiResponse } from "../utils/APIResponse.js";


export const getMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const dealId = req.params.chatID;

    if (!dealId || Array.isArray(dealId)) {
      throw new ApiError(400, "Deal id required");
    }

    const deal = await Deal.findById(dealId);

    if (!deal) {
      throw new ApiError(404, "No deal found");
    }

    // Ensure current user belongs to this deal
    const isParticipant =
      deal.hostUserId.toString() === req.userId ||
      deal.joinerUserId.toString() === req.userId;

    if (!isParticipant) {
      throw new ApiError(403, "Unauthorized");
    }

    const messages = await Message.find({ dealId })
      .populate("senderId", "displayName avatarInitials")
      .sort({ createdAt: 1 });

    res.status(200).json(new ApiResponse(200,messages,"Successfully fetch the messages"));
  }
);