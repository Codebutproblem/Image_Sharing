import { Op } from 'sequelize';
import { UserAccount } from '../models/index.model.js';
export const getInfoUserBySlugService = async (slug) => {
    const user = await UserAccount.findOne({
        attributes: {
            exclude: ['password', 'refreshToken']
        },
        where: {
            slug: slug,
            deleted: false
        },
    });
    return user;
};

export const updateInfoUserService = async (userId, data) => {
    const user = await UserAccount.update(data, {
        where: {
            id: userId
        }
    });
    return user;
};

export const getSearchUsersService = async (keyword) => {
    const users = await UserAccount.findAll({
        attributes: {
            exclude: ['password', 'refreshToken']
        },
        where: {
            deleted: false,
            [Op.or]: [
                {
                    username: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
    });
    return users;
};