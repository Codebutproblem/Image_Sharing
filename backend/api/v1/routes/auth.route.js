import { loginPost, logout, refreshAccessToken, registerPost, sendOTP, verifyOTP} from '../controllers/auth.controller.js';
import { validRegister, verifyEmail, verifyLogin, verifyRefreshToken } from '../middlewares/auth.middleware.js';
const authRoutes = (app) => {
    const API_PATH = "/api/v1";
    app.post(`${API_PATH}/auth/register`, validRegister, registerPost);
    app.post(`${API_PATH}/auth/login`, verifyLogin ,loginPost);
    app.post(`${API_PATH}/auth/refresh-token`,verifyRefreshToken ,refreshAccessToken);
    app.post(`${API_PATH}/auth/logout`, logout);
    app.post(`${API_PATH}/auth/send-otp`, verifyEmail,sendOTP);
    app.post(`${API_PATH}/auth/verify-otp`, verifyOTP);
}

export default authRoutes;