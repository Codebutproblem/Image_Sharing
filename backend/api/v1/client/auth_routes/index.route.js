import { loginPost, logout, refreshToken, registerPost, sendOTP, verifyOTP} from '../controllers/auth.controller.js';
import {validateRegister} from '../middlewares/formValidate.middleware.js';
const clientAuthRoutes = (app) => {
    const API_PATH = "/api/v1";
    app.post(`${API_PATH}/auth/register`,validateRegister, registerPost);
    app.post(`${API_PATH}/auth/login`, loginPost);
    app.post(`${API_PATH}/auth/refresh-token`, refreshToken);
    app.post(`${API_PATH}/auth/logout`, logout);
    app.post(`${API_PATH}/auth/send-otp`, sendOTP);
    app.post(`${API_PATH}/auth/verify-otp`, verifyOTP);
}

export default clientAuthRoutes;