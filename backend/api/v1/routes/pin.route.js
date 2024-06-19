import { Router } from "express";
import { 
    createPin, 
    deletePin, 
    getDetailUserPin, 
    getPinDetail, 
    getPins, 
    getPinsByTable, 
    getPinsByTopic, 
    getRecommendPins, 
    getSearchPins, 
    getUserPins, 
    savePin, 
    setLovePin, 
    unSavePin, 
    updatePin
} from "../controllers/pin.controller.js";
import { verifyAuthor } from "../middlewares/pin.middleware.js";

const router = Router();

router.get("/", getPins);
router.get("/detail/:slug", getPinDetail);
router.get("/recommend/:slug", getRecommendPins);
router.get("/user-pin/:user_slug", getUserPins);
router.get("/user-pin/detail/:slug", getDetailUserPin);
router.get("/user-pin/table/:table_slug", getPinsByTable);
router.get("/search", getSearchPins);
router.post("/topics", getPinsByTopic);
router.post("/create", createPin);
router.patch("/love/:pinId", setLovePin);
router.patch("/save", savePin);
router.patch("/unsave/:id", unSavePin);
router.patch("/user-pin/update/:slug", verifyAuthor , updatePin);
router.delete("/user-pin/delete/:slug", verifyAuthor, deletePin);

export default router;