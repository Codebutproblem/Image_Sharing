import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { findPinBySlugService } from "../services/pin.service.js";

export const verifyAuthor = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { user } = req;
        const pin = await findPinBySlugService(slug);
        if (!pin || pin.user_id !== user.id) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.UPDATE_FAILED });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
}