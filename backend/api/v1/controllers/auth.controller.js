import { 
    creatAccountService, 
    findOTPEmailService, 
    logoutService, 
    sendOTPEmailService, 
    signTokenService 
} from "../services/auth.service.js";

export const registerPost = async (req, res) => {

    try {
        const userAccount = await creatAccountService(req.body);
        return res.status(201).json({
            userAccount: userAccount,
            message: "register-success"
        });
    } catch (error) {
        console.log(error);
        return res.status(502).json({
            message: "register-failed"
        });
    }

}

export const loginPost = async (req, res) => {
    try {
        const userAccount = req.userAccount;
        const { accessToken, refreshToken } = await signTokenService(userAccount);
        res.status(200).json({ accessToken, refreshToken, message: "login-success" });
    } catch (error) {
        res.status(502).json({ message: "login-failed" });
    }
}

export const refreshAccessToken = async (req, res) => {
    const accessToken = req.accessToken;
    res.status(201).json({ accessToken, message: "refresh-token-success" });
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        await logoutService(refreshToken);
        res.status(200).json({ message: "logout-success" });
    } catch (error) {
        res.status(502).json({ message: "logout-failed" });
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        await sendOTPEmailService(email);

        res.status(200).json({ message: "send-otp-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "send-otp-failed" });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpEmail = await findOTPEmailService(email);

        if (!otpEmail || otpEmail.otp !== otp) {
            return res.status(400).json({ message: "verify-otp-failed" });
        }
        res.status(200).json({ message: "verify-otp-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "verify-otp-failed" });
    }
};