import ResponseMessage from "../config/message";
import { get, patch } from "../requests/request";

export const checkLogin = async () => {
  const refeshToken = localStorage.getItem("refreshToken");
  if (refeshToken === null) {
    return null;
  }
  const result = await get("user-account/verify-login");
  if (result.message == ResponseMessage.VERIFY_SUCCESS) {
    return result.user;
  }
  return null;
};

export const getInfoUser = async (slug = "") => {
  if (slug !== "") {
    const result = await get(`user-account/info-user/${slug}`);
    return result;
  }
  const result = await get("user-account/info-user");
  return result;
};

export const updateInfoUser = async (data) => {
  const result = await patch("user-account/update-info", data);
  return result;
};

export const getSearchUsers = async (keyword) => {
  const result = await get(`user-account/search?keyword=${keyword}`);
  return result;
};
