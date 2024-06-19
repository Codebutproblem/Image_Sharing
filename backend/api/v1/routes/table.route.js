import { Router } from "express";
import { createTable, deleteTable, getAllUserTables, getUserTables, updateTableName } from "../controllers/table.controller.js";
import { checkTableExists, verifyAuthor } from "../middlewares/table.middleware.js";

const router = Router();

router.get("/", getAllUserTables);
router.get("/:user_slug", getUserTables);
router.post("/create", checkTableExists , createTable);
router.patch("/update/:slug", verifyAuthor , updateTableName);
router.delete("/delete/:slug", verifyAuthor, deleteTable);
export default router;