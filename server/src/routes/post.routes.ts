import { createPost,getPosts } from "../controllers/post.js";
import { Router } from "express";
import { verifyAuth } from "../middleware'/auth.middleware.js"; 

const router = Router();

router.route("/create").post(verifyAuth,createPost);
router.route("/posts").get(verifyAuth,getPosts);


export default router;