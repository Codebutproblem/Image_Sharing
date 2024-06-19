import { del, get, post } from "../requests/request";

export const createSearch = async (keyword) => {
    const reuslt = await post("search/create", { keyword});
    return reuslt;
};

export const getSearchs = async (limit) => {
    const result = await get(`search/get-all?limit=${limit}`);
    return result;
};

export const deleteSearch = async (id) => {
    const result = await del(`search/delete/${id}`);
    return result;
};