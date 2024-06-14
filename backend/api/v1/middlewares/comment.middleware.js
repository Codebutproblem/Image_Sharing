import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { findCommentService } from "../services/comment.service.js";

export const verifyUserDeleteComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const comment = await findCommentService(id);
        if(comment && comment.user_id === userId){
            next();
            return;
        };
        res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.DELETE_FAILED });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.DELETE_FAILED });
    }
};