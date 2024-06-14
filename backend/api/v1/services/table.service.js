import {Table} from "../models/index.model.js";

export const createTableService = async (userId, tableName) => {
    await Table.create({
        name: tableName,
        user_id: userId
    });
};

export const findTableByNameService = async ( userId,tableName) => {
    const table = await Table.findOne({
        where: {
            user_id: userId,
            name: tableName
        }
    });
    return table;
};

export const getAllUserTablesService = async (userId) => {
    const tables = await Table.findAll({
        where: {
            user_id: userId
        }
    });
    return tables;
};