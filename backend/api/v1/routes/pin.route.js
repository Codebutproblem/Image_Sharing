import { Router } from "express";
import { createPin, getDetailUserPin, getPinDetail, getPins, getPinsByTopic, getRecommendPins, getUserPins, savePin, setLovePin, unSavePin} from "../controllers/pin.controller.js";

const router = Router();

router.get("/", getPins);
router.get("/detail/:slug", getPinDetail);
router.post("/topics", getPinsByTopic);
router.post("/create", createPin);
router.get("/recommend/:slug", getRecommendPins);
router.patch("/love/:pinId", setLovePin);
router.patch("/save", savePin);
router.patch("/unsave/:id", unSavePin);
router.get("/user-pin/:user_slug", getUserPins);
router.get("/user-pin/detail/:slug", getDetailUserPin);
export default router;