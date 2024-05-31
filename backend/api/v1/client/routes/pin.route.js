import { Router } from "express";
import { createPin, getPins} from "../controllers/pin.controller.js";
import { validatePinUploader } from "../middlewares/formValidate.middleware.js";

const router = Router();

router.get("/", getPins);
router.post("/create", validatePinUploader, createPin);
export default router;