import { Request,Response,NextFunction } from "express"
import { ApiError } from "../utils/APIError.js"

export const errorMiddleWare= (err:any,req:Request,res:Response,next:NextFunction)=>{
     if(err instanceof ApiError){
        console.log(err.message);
        return res.status(err.statusCode).json({
            message: err.message,
        })
     }
     console.log(err);
     return res.status(500).json({
         message: "Internal Server Error",
         success: false
     })
}