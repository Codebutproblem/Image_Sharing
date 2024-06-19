import { Pin, Table, UserAccount } from "../models/index.model.js";

export const createTableService = async (userId, tableName) => {
    await Table.create({
        name: tableName,
        user_id: userId
    });
};

export const findTableByNameService = async (userId, tableName) => {
    const table = await Table.findOne({
        where: {
            user_id: userId,
            name: tableName,
            deleted: false
        }
    });
    return table;
};

export const getAllUserTablesService = async (userId) => {
    const tables = await Table.findAll({
        where: {
            user_id: userId,
            deleted: false
        }
    });
    return tables;
};

export const getUserTablesService = async (userSlug, pagination) => {
    const tables = await Table.findAll({
        attributes: ["id", "name", "slug", "createdAt"],
        where: {
            deleted: false,
        },
        include: {
            model: UserAccount,
            as: "Author",
            attributes: ["slug"],
            where: {
                slug: userSlug,
                deleted: false
            }
        },
        limit: pagination.limit,
        offset: pagination.offset,
        order: [["createdAt", "DESC"]],
        raw: true
    });

    for (const table of tables) {
        const frontPin = await Pin.findOne({
            attributes: ["url"],
            where: {
                deleted: false
            },
            include: {
                model: Table,
                through: {
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                where: {
                    id: table.id,
                    deleted: false
                }
            },
            raw: true
        });
        table.frontPin = frontPin;
    }
    return tables;
};

export const countUserTablesService = async (userSlug) => {
    const count = await Table.count({
        where: {
            deleted: false,
        },
        include: [
            {
                model: UserAccount,
                as: "Author",
                where: {
                    slug: userSlug,
                    deleted: false
                }
            }
        ]
    });
    return count;
};

export const findTableBySlugService = async (slug) => {
    const table = await Table.findOne({
        where: {
            slug: slug,
            deleted: false
        },
        raw: true
    });
    return table;
};

export const updateTableNameService = async (slug, tableName) => {
    await Table.update({
        name: tableName
    }, {
        where: {
            slug: slug,
            deleted: false
        }
    });
};

export const deleteTableService = async (slug) => {
    await Table.update({
        deleted: true,
        deletedAt: new Date()
    }, {
        where: {
            slug: slug
        }
    });
};