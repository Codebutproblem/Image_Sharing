import { Router } from "express";
import { getInfoUserAccount, getInfoUserBySlug, getSearchUsers, updateInfoUser, verifyLogin } from "../controllers/user_account.controller.js";
const router = Router();

router.get("/verify-login", verifyLogin);
router.get("/info-user", getInfoUserAccount);
router.get("/info-user/:slug", getInfoUserBySlug);
router.get("/search", getSearchUsers);
router.patch("/update-info", updateInfoUser);
export default router;