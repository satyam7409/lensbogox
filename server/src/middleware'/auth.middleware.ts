import { NextFunction, Response, Request } from "express";
import { ApiError } from "../utils/APIError.js";
import admin from "../config/firebase.js";
import User from "../models/user.js";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    throw new ApiError(400, "No token found");
  }
  const idToken = token.split(" ")[1] as string;
  try {
    const verifyToken = await admin.auth().verifyIdToken(idToken);
    // req.userId = verifyToken.uid;

    const user = await User.findOne({firebaseUid: verifyToken.uid});
    if (!user) {
      throw new ApiError(400, "no user found");
    }
    req.userObj = user;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    throw new ApiError(400, "Unauthorise");
  }
};
