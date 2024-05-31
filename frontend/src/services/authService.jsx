import { post } from "../requests/authRequest";

export const registerUserAccount = async (userAccount) => {
  const result = await post("auth/register", userAccount);
  return result;
};

export const loginUserAccount = async (userAccount) => {
  const result = await post("auth/login", userAccount);
  return result;
};

export const refreshToken = async () => {
  const result = await post("auth/refresh-token", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  localStorage.setItem("accessToken", result.accessToken);
};

export const logout = async () => {
  const result = await post("auth/logout", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  return result;
};