import express from "express";
import { createServer } from "http";
import { igniteSocket } from "./socket/socket.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import { connectDB } from "./config/db.js";
import { errorMiddleWare } from "./middleware'/error.middleware.js";
import chatRoutes from "./routes/chat.routes.js";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
const PORT = Number(process.env.PORT) || 8080;
const app = express();
const server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}));
igniteSocket(server);
await connectDB();
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/deal", dealRoutes);
app.use("/api/messages", chatRoutes);
app.post("/", () => {
    console.log("hanji");
});
app.use(errorMiddleWare);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map