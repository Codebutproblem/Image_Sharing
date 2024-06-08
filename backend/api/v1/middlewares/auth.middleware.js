import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {
    findUserAccountByEmailService,
    findUserAccountByRefreshTokenService
} from '../services/auth.service.js';

export const authToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ message: "access-token-not-found" });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "invalid-token" });
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
            return res.status(400).json({
                message: "login-failed"
            });
        }

        if (userAccount.status === "inactive") {
            return res.status(400).json({
                message: "account-inactive"
            });
        }
        req.userAccount = userAccount;
        next();
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "login-failed" });
    }

};

export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "refresh-token-not-found" });
    }

    try {
        const userExisted = await findUserAccountByRefreshTokenService(refreshToken);
        if (!userExisted) {
            return res.status(403).json({ message: "invalid-refresh-token" });
        }
    } catch (error) {
        return res.status(502).json({ message: "refresh-token-failed" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "invalid-refresh-token" });
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
            return res.status(404).json({ message: "user-not-found" });
        }
        next();
    } catch (error) {
        res.status(502).json({ message: "send-otp-failed" });
    }
};