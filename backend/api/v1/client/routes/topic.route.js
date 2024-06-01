import { Router } from "express";
import { getAllTopics, getTopicsSelected} from '../controllers/topic.controller.js';
const router = Router();

router.get("/", getAllTopics);
router.post("/selected",getTopicsSelected);
export default router;