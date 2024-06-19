import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { countUserTablesService, createTableService, deleteTableService, getAllUserTablesService, getUserTablesService, updateTableNameService } from "../services/table.service.js";
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

export const getUserTables = async (req, res) => {
    try {
        const userSlug = req.params.user_slug;
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const tables = await getUserTablesService(userSlug, { limit, offset });
        const totalTables = await countUserTablesService(userSlug);
        const total_pages = Math.ceil(totalTables / limit);
        res.status(HttpStatusCode.OK).json({ tables, total_pages, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const updateTableName = async (req, res) => {
    try {
        const tableName = req.body.name;
        const tableSlug = req.params.slug;
        await updateTableNameService(tableSlug, tableName);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};

export const deleteTable = async (req, res) => {
    try {
        const tableSlug = req.params.slug;
        await deleteTableService(tableSlug);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.DELETE_FAILED });
    }
};