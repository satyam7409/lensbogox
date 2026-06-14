import { verifyAuth } from "../middleware'/auth.middleware.js";
import { Router } from "express";
import { createDeal, getDeals } from "../controllers/deal.js";
const router = Router();
router.route("/create").post(verifyAuth, createDeal);
router.route("/getdeals").get(verifyAuth, getDeals);
export default router;
//# sourceMappingURL=deal.routes.js.map