import { Router } from "express";
import { createPin, getPinDetail, getPins, getPinsByTopic, getRecommendPins} from "../controllers/pin.controller.js";

const router = Router();

router.get("/", getPins);
router.get("/detail/:slug", getPinDetail);
router.post("/topics", getPinsByTopic);
router.post("/create", createPin);
router.get("/recommend/:slug", getRecommendPins);
export default router;