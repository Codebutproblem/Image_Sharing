import { get, post } from "../requests/request";

export const createPin = async (pin) => {
  const result = await post("pins/create", pin);
  return result;
};

export const getPins = async () => {
  const result = await get("pins");
  return result;
};

export const getPinsByTopic = async (topicIds) => {
  const result = await post("pins/topics", { topicIds });
  return result;
};

export const getPinsBySlug = async (user_account_slug) => {
  const result = await get(`pins/${user_account_slug}`);
  return result;
}

export const getSavedPinsBySlug = async (user_account_slug) => {
  const result = await get(`pins/saved/${user_account_slug}`);
  return result;
};