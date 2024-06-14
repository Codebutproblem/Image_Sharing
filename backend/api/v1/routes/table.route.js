import { Router } from "express";
import { createTable, getAllUserTables } from "../controllers/table.controller.js";
import { checkTableExists } from "../middlewares/table.middleware.js";

const router = Router();

router.post("/create", checkTableExists , createTable);
router.get("/", getAllUserTables);
export default router;