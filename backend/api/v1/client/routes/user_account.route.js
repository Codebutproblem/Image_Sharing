import { Router } from "express";
import { getInfoUserAccount, verifyLogin } from "../controllers/user_account.controller.js";
const router = Router();

router.get("/verify-login", verifyLogin);
router.get("/info-user", getInfoUserAccount);
export default router;