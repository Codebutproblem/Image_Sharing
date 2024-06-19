import {Search} from '../models/index.model.js';


export const getSearchsService = async (userId, limit) => {
    const searchs = await Search.findAll({
        where: {
            user_id: userId,
            deleted: false
        },
        limit: limit,
        order: [['createdAt', 'DESC']]
    });
    return searchs;
}
export const createSearchService = async (keyword, userId) => {
    await Search.update({deleted: true}, {
        where: {
            keyword: keyword,
            user_id: userId
        }
    });
    
    await Search.create({
        keyword: keyword,
        user_id: userId
    });
};

export const deleteSearchService = async (id) => {
    await Search.update({deleted: true}, {
        where: {
            id: id
        }
    });
};

export const getSearchByIdService = async (id) => {
    const search = await Search.findOne({
        where: {
            id: id,
            deleted: false
        }
    });
    return search;
};