import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { findTableByNameService, findTableBySlugService } from "../services/table.service.js";

export const checkTableExists = async (req, res, next) => {
    try {
        const tableName = req.body.name;
        const userId = req.user.id;
        const table = await findTableByNameService(userId,tableName);
        if (table) {
            return res.status(HttpStatusCode.CONFLICT).json({ message: ResponseMessage.TABLE_EXISTS });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_FAILED });
    }
};

export const verifyAuthor = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const userId = req.user.id;
        const table = await findTableBySlugService(slug);
        if(!table || table.user_id !== userId){
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.ACCESS_FAILED });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};