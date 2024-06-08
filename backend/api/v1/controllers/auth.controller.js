import { HttpStatusCode, ResponseMessage } from "../../../config/system.js";
import { 
    creatAccountService, 
    findOTPEmailService, 
    logoutService, 
    sendOTPEmailService, 
    signTokenService 
} from "../services/auth.service.js";

export const registerPost = async (req, res) => {

    try {
        await creatAccountService(req.body);
        return res.status(HttpStatusCode.CREATED).json({message: ResponseMessage.REGISTER_SUCCESS});
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseMessage.REGISTER_FAILED
        });
    }

}

export const loginPost = async (req, res) => {
    try {
        const userAccount = req.userAccount;
        const { accessToken, refreshToken } = await signTokenService(userAccount);
        res.status(HttpStatusCode.OK).json({ accessToken, refreshToken, message: ResponseMessage.LOGIN_SUCCESS });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.LOGIN_FAILED });
    }
}

export const refreshAccessToken = async (req, res) => {
    const accessToken = req.accessToken;
    res.status(HttpStatusCode.CREATED).json({ accessToken, message: ResponseMessage.REFRESH_TOKEN_SUCCESS });
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        await logoutService(refreshToken);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.LOGOUT_SUCCESS });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.LOGOUT_FAILED});
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        await sendOTPEmailService(email);

        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.SEND_OTP_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SEND_OTP_FAILED });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpEmail = await findOTPEmailService(email);

        if (!otpEmail || otpEmail.otp !== otp) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ResponseMessage.WRONG_OTP });
        }
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.VERIFY_OTP_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.VERIFY_OTP_FAILED });
    }
};