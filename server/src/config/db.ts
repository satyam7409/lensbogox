import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=>{
    try {
        await  mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}