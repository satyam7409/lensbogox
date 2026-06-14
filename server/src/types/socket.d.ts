import { Socket } from "socket.io"
import { IUser } from "../models/user.ts"

declare module "socket.io" {
  interface Socket {
    userId:  string
    userObj: IUser
  }
}