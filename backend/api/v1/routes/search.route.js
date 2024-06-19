import { Router } from "express";
import { createSearch, deleteSearch, getSearchs } from "../controllers/search.controller.js";
import { verifyAuthor } from "../middlewares/search.middleware.js";

const router = Router();

router.get("/get-all", getSearchs);
router.post("/create", createSearch);
router.delete("/delete/:id", verifyAuthor , deleteSearch);

export default router;