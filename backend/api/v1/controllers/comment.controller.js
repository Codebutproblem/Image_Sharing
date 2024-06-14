import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { countAllCommentsService, createCommentService, deleteCommentService, getCommentsService } from "../services/comment.service.js";
import { getPinBySlugService } from "../services/pin.service.js";

export const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const pinSlug = req.params.pin_slug;
        const content = req.body.content;
        const pin = await getPinBySlugService(pinSlug);
        const pinId = pin.id;
        await createCommentService({ userId, pinId, content });
        res.status(HttpStatusCode.CREATED).json({ message: ResponseMessage.CREATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_FAILED });
    }
};

export const getComments = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const pinSlug = req.params.pin_slug;
        const comments = await getCommentsService(pinSlug, { limit, offset });
        const totalComments = await countAllCommentsService(pinSlug);
        const totalPage = Math.ceil(totalComments / limit);
        res.status(HttpStatusCode.OK).json({comments, totalPage , message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteCommentService(id);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.DELETE_FAILED });
    }
};