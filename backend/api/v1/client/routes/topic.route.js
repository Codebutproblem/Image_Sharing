import { Router } from "express";
import { getAllTopics } from '../controllers/topic.controller.js';
const router = Router();

router.get("/", getAllTopics);

export default router;