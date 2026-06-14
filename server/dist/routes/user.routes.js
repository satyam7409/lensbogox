import { Router } from "express";
import { login } from "../controllers/user.js";
const router = Router();
router.route("/login").post(login);
export default router;
//# sourceMappingURL=user.routes.js.map