import { del, get, post } from "../requests/request";

export const createComment = async ({slug, content}) => {
    const result = await post(`comments/create/${slug}`, {content});
    return result;
};

export const getComments = async (slug, {page , limit}) => {
    const result = await get(`comments/${slug}?page=${page}&limit=${limit}`);
    return result;
};

export const deleteComment = async (id) => {
    const result = await del(`comments/delete/${id}`);
    return result;
};