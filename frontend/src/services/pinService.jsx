import { get, post } from "../requests/request";

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
