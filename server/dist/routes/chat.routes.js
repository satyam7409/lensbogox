import { getMessages } from "../controllers/chat.js";
import { Router } from "express";
import { verifyAuth } from "../middleware'/auth.middleware.js";
const router = Router();
router.route("/:chatID").get(verifyAuth, getMessages);
export default router;
//# sourceMappingURL=chat.routes.js.map