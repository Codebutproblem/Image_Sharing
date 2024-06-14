import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {
    findUserAccountByEmailService,
    findUserAccountByRefreshTokenService
} from '../services/auth.service.js';
import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";

export const authToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

    if (!accessToken) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ResponseMessage.ACCESS_TOKEN_NOT_FOUND });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.INVALID_TOKEN });
        }
        delete user.iat;
        delete user.exp;
        req.user = user;
        next();
    });
}

export const verifyLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userAccount = await findUserAccountByEmailService(email);

        if (!userAccount || userAccount.password !== md5(password)) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: ResponseMessage.WRONG_ACCOUNT_OR_PASSWORD
            });
        }

        if (userAccount.status === "inactive") {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: ResponseMessage.ACCOUNT_INACTIVE
            });
        }
        req.userAccount = userAccount;
        next();
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.LOGIN_FAILED });
    }

};

export const validRegister = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ResponseMessage.FIELD_REQUIRED });
    }
    if (password !== confirmPassword) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ResponseMessage.PASSWORD_NOT_MATCH });
    }
    const userAccount = await findUserAccountByEmailService(email);
    if (userAccount) {
        return res.status(HttpStatusCode.CONFLICT).json({ message: ResponseMessage.EMAIL_EXISTED });
    }
    next();
};

export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ResponseMessage.REFRESH_TOKEN_NOT_FOUND });
    }

    try {
        const userExisted = await findUserAccountByRefreshTokenService(refreshToken);
        if (!userExisted) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.INVALID_REFRESH_TOKEN });
        }
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.REFRESH_TOKEN_FAILED });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ResponseMessage.INVALID_REFRESH_TOKEN });
        }
        delete user.iat;
        delete user.exp;
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
        req.accessToken = accessToken;
        next();
    });

};

export const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userAccount = await findUserAccountByEmailService(email);
        if (!userAccount) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: ResponseMessage.USER_NOT_FOUND });
        }
        next();
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SEND_OTP_FAILED });
    }
};