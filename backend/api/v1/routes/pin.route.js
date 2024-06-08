import { Router } from "express";
import { createPin, getPins, getPinsByTopic} from "../controllers/pin.controller.js";

const router = Router();

router.get("/", getPins);
router.post("/topics", getPinsByTopic);
router.post("/create", createPin);
export default router;