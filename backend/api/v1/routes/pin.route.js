import { Router } from "express";
import { createPin, getPinDetail, getPins, getPinsByTopic, getRecommendPins, savePin, setLovePin, unSavePin} from "../controllers/pin.controller.js";

const router = Router();

router.get("/", getPins);
router.get("/detail/:slug", getPinDetail);
router.post("/topics", getPinsByTopic);
router.post("/create", createPin);
router.get("/recommend/:slug", getRecommendPins);
router.patch("/love/:pinId", setLovePin);
router.patch("/save", savePin);
router.patch("/unsave/:id", unSavePin);
export default router;