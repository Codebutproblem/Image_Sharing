import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { getSearchByIdService } from "../services/search.service.js";

export const verifyAuthor = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const search = await getSearchByIdService(id);
        if(search && search.user_id === userId) {
            next();
            return;
        }
        res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.ACCESS_FAILED });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.ACCESS_FAILED });
    }
};