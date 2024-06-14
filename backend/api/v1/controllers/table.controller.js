import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { createTableService, getAllUserTablesService } from "../services/table.service.js";
export const createTable = async (req, res) => {
    try {
        const userId = req.user.id;
        const tableName = req.body.name;
        await createTableService(userId, tableName);
        res.status(HttpStatusCode.CREATED).json({ message: ResponseMessage.CREATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_FAILED });
    }
};

export const getAllUserTables = async (req, res) => {
    try {
        const tables = await getAllUserTablesService(req.user.id);
        res.status(HttpStatusCode.OK).json({ tables, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};