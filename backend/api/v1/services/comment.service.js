import { Comment, Pin, UserAccount } from '../models/index.model.js';
export const createCommentService = async ({ userId, pinId, content }) => {
    await Comment.create({
        content: content,
        user_id: userId,
        pin_id: pinId
    });
};

export const getCommentsService = async (pinSlug, { limit, offset }) => {
    const comments = await Comment.findAll({
        attributes: ['id', 'content', 'createdAt'],
        where: {
            deleted: false
        },
        include: [
            {
                model: Pin,
                attributes: [],
                where: {
                    slug: pinSlug,
                    deleted: false
                }
            },
            {
                model: UserAccount,
                as: "Author",
                attributes: ['id', 'username', 'avatar']
            }
        ],
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    });
    return comments;
};

export const countAllCommentsService = async (pinSlug) => {
    const count = await Comment.count({
        where: {
            deleted: false
        },
        include: [
            {
                model: Pin,
                attributes: [],
                where: {
                    slug: pinSlug,
                    deleted: false
                }
            }
        ]
    });
    return count;
};

export const deleteCommentService = async (id) => {
    await Comment.update({
        deleted: true,
        deletedAt: new Date()
    }, {
        where: {
            id: id
        }
    })
};

export const findCommentService = async (id) => {
    const comment = await Comment.findOne({
        where: {
            id: id,
            deleted: false
        }
    });
    return comment;
};