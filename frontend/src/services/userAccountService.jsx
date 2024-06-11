import { ResponseMessage } from "../config/system";
import { get } from "../requests/request";

export const checkLogin = async () => {
  const refeshToken = localStorage.getItem("refreshToken");
  if (refeshToken === null) {
    return false;
  }
  const result = await get("user-account/verify-login");
  if (result.message == ResponseMessage.VERIFY_LOGIN_SUCCESS) {
    return true;
  }
  return false;
};

export const getInfoUser = async (slug = "") => {
  if (slug !== "") {
    const result = await get(`user-account/info-user/${slug}`);
    return result;
  }
  const result = await get("user-account/info-user");
  return result;
};
