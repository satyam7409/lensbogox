import { Server } from "socket.io";
import { registerChatHandlers } from "./chat.js";
import User from "../models/user.js";
import admin from "../config/firebase.js";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
let ioInstance = null;
export const getIO = () => ioInstance;
export const igniteSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: CLIENT_ORIGIN,
            credentials: true,
        },
    });
    ioInstance = io;
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) {
                return next(new Error("NO_TOKEN"));
            }
            const decoded = await admin.auth().verifyIdToken(token);
            const user = await User.findOne({ firebaseUid: decoded.uid });
            if (!user) {
                return next(new Error("USER_NOT_REGISTERED"));
            }
            socket.userId = user._id.toString();
            socket.userObj = user;
            next();
        }
        catch (err) {
            console.error("Socket auth failed:", err);
            next(new Error("AUTH_FAILED"));
        }
    });
    io.on("connection", (socket) => {
        socket.join(`user:${socket.userId}`);
        registerChatHandlers(io, socket);
        console.log("Socket connected:", socket.userId);
    });
    return io;
};
//# sourceMappingURL=socket.js.map