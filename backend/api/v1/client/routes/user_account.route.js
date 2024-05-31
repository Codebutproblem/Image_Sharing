import { Router } from "express";
import { getInfoUserAccount, getInfoUserBySlug, verifyLogin } from "../controllers/user_account.controller.js";
const router = Router();

router.get("/verify-login", verifyLogin);
router.get("/info-user", getInfoUserAccount);
router.get("/info-user/:slug", getInfoUserBySlug);
export default router;