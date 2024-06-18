import { Router } from "express";
import { createTable, getAllUserTables, getUserTables } from "../controllers/table.controller.js";
import { checkTableExists } from "../middlewares/table.middleware.js";

const router = Router();

router.get("/", getAllUserTables);
router.get("/:user_slug", getUserTables);
router.post("/create", checkTableExists , createTable);

export default router;