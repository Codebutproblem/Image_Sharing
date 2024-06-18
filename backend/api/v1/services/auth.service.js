import md5 from "md5";
import {OTPEmail, UserAccount} from "../models/index.model.js";
import jwt from "jsonwebtoken";
import { generateRandomNumber } from "../../../utils/generate.js";
import sendMail from "../../../utils/mail.js";

export const creatAccountService = async (newUserAccount) => {
    newUserAccount.password = md5(newUserAccount.password);
    const userAccount = await UserAccount.create(newUserAccount);
    return userAccount;
};

export const signTokenService = async (userAccount) => {
    const dataSign = {
        id: userAccount.id,
        username: userAccount.username,
        email: userAccount.email,
        avatar: userAccount.avatar,
        slug: userAccount.slug
    }

    const accessToken = jwt.sign(dataSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
    const refreshToken = jwt.sign(dataSign, process.env.REFRESH_TOKEN_SECRET);
    await UserAccount.update({ refreshToken: refreshToken }, {
        where: {
            id: userAccount.id
        }
    });

    return { accessToken, refreshToken };
};

export const logoutService = async (refreshToken) => {
    await UserAccount.update({ refreshToken: null }, {
        where: {
            refreshToken: refreshToken
        }
    });
};

export const sendOTPEmailService = async (email) => {

    await OTPEmail.update({ deleted: true }, {
        where: {
            email: email
        }
    });

    const otpEmail = await OTPEmail.create({
        email: email,
        otp: generateRandomNumber(6),
        expireIn: new Date(new Date().getTime() + (2 * 60 * 1000))
    });

    const subject = "OTP Email From Photo Sharing";
    const html = `<p>MÃ XÁC MINH: <h3>${otpEmail.otp}</h3>(Thời hạn trong 2 phút)</p>`;
    sendMail(email, subject, html);
};

export const findUserAccountByEmailService = async (email) => {
    const userAccount = await UserAccount.findOne({
        where: {
            email: email,
            deleted: false
        }
    });
    return userAccount;
}

export const findUserAccountByRefreshTokenService = async (refreshToken) => {
    const userAccount = await UserAccount.findOne({
        where: {
            refreshToken: refreshToken,
            deleted: false
        }
    });
    return userAccount;
};

export const findOTPEmailService = async (email) => {
    const otpEmail = await OTPEmail.findOne({
        where: {
            email: email,
            deleted: false
        }
    });
    return otpEmail;
};