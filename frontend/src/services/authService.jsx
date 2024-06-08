import { get, post } from "../requests/authRequest";

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
  if(result.message === "refresh-token-success") {
    localStorage.setItem("accessToken", result.accessToken);
  }
};

export const logout = async () => {
  const result = await post("auth/logout", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  return result;
};

export const sendOTP = async (email) => {
  const result = await post(`auth/send-otp`, { email: email });
  return result;
}

export const verifyOTP = async (data) => {
  const result = await post(`auth/verify-otp`, data);
  return result;
}
