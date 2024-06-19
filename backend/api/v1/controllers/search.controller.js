import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { createSearchService, deleteSearchService, getSearchsService } from "../services/search.service.js";

export const getSearchs = async (req, res) => {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 8;
        const searchs = await getSearchsService(userId, limit);
        res.status(HttpStatusCode.OK).json({ searchs, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const createSearch = async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const userId = req.user.id;
        await createSearchService(keyword, userId);
        res.status(HttpStatusCode.CREATED).json({ message: ResponseMessage.CREATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_FAILED });
    }
};

export const deleteSearch = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteSearchService(id);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.DELETE_FAILED });
    }
};