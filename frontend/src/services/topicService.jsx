import { get, post } from "../requests/request";

export const getAllTopics = async (sorted = "") => {
  const result = await get("topics" + (sorted ? `?sorted=${sorted}` : ""));
  return result;
};

export const getTopicsSelected = async (topicIds) => {
  const result = await post("topics/selected", { topicIds });
  return result;
}
