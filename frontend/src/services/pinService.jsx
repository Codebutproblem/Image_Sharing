import { del, get, patch, post } from "../requests/request";

export const createPin = async (pin) => {
  const result = await post("pins/create", pin);
  return result;
};

export const getPins = async ({ page, limit }) => {
  const result = await get(`pins?page=${page}&limit=${limit}`);
  return result;
};

export const getPinsByTopic = async ({ selectedTopics, page, limit }) => {
  const result = await post(`pins/topics?page=${page}&limit=${limit}`, {
    selectedTopics,
  });
  return result;
};

export const getPinDetail = async (slug) => {
  const result = await get(`pins/detail/${slug}`);
  return result;
};

export const getRecommendPins = async ({ slug, limit }) => {
  const result = await get(`pins/recommend/${slug}?limit=${limit}`);
  return result;
};

export const setLovePin = async (pinId) => {
  const result = await patch(`pins/love/${pinId}`);
  return result;
};

export const savePin = async (pinId, tableId) => {
  const result = await patch("pins/save", { pinId, tableId });
  return result;
};

export const unSavePin = async (pinId) => {
  const result = await patch(`pins/unsave/${pinId}`);
  return result;
};

export const getUserPins = async (slug, {page, limit}) => {
  const result = await get(`pins/user-pin/${slug}?page=${page}&limit=${limit}`);
  return result;
};

export const getDetailUserPin = async (slug) => {
  const result = await get(`pins/user-pin/detail/${slug}`);
  return result;
};

export const updatePin = async (slug, data) => {
  const result = await patch(`pins/user-pin/update/${slug}`, data);
  return result;
};

export const deletePin = async (slug) => {
  const result = await del(`pins/user-pin/delete/${slug}`);
  return result;
};

export const getPinsByTable = async (slug, {page, limit}) => {
  const result = await get(`pins/user-pin/table/${slug}?page=${page}&limit=${limit}`);
  return result;
};