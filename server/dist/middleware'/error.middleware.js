import { ApiError } from "../utils/APIError.js";
export const errorMiddleWare = (err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log(err.message);
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    console.log(err);
    return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
};
//# sourceMappingURL=error.middleware.js.map