import { get, patch, post } from "../requests/request";

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
