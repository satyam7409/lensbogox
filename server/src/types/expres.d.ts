import { Request } from "express";
import { IUser } from "../models/user.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userObj?: IUser;
    }
  }
}
