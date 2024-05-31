import UserAccount from "../../models/user_account.model.js";
import md5 from "md5";
import jwt from "jsonwebtoken";


export const registerPost = async (req, res) => {

    const { username, email, password, gender } = req.body;

    const newUserAccount = {
        username: username,
        email: email,
        password: md5(password),
        gender: gender
    }

    try {
        const userAccount = await UserAccount.create(newUserAccount);
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
    const { email, password } = req.body;

    const userAccount = await UserAccount.findOne({
        where: {
            email: email,
            deleted: false
        }
    });

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

    const dataSign = {
        id: userAccount.id,
        username: userAccount.username,
        email: userAccount.email,
        avatar: userAccount.avatar,
        first_name: userAccount.first_name,
        last_name: userAccount.last_name,
        introduce: userAccount.introduce,
        personal_link: userAccount.personal_link,
        date_of_birth: userAccount.date_of_birth,
        gender: userAccount.gender,
        language: userAccount.language,
        nation: userAccount.nation,
        slug: userAccount.slug
    }
    
    const accessToken = jwt.sign(dataSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
    const refreshToken = jwt.sign(dataSign, process.env.REFRESH_TOKEN_SECRET);
    await UserAccount.update({ refreshToken: refreshToken }, {
        where: {
            id: userAccount.id
        }
    });
    res.status(200).json({ accessToken, refreshToken, message: "login-success" });
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "refresh-token-not-found" });
    }
    const userExisted = await UserAccount.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!userExisted) {
        return res.status(403).json({ message: "invalid-refresh-token" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "invalid-refresh-token" });
        }
        delete user.iat;
        delete user.exp;
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
        res.status(201).json({ accessToken, message: "refresh-token-success"});
    });
}

export const logout = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken){
        return res.status(401).json({ message: "refresh-token-not-found" });
    }
    const userExisted = await UserAccount.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!userExisted) {
        return res.status(403).json({ message: "invalid-refresh-token" });

    }
    UserAccount.update({ refreshToken: null }, {
        where: {
            refreshToken: refreshToken
        }
    });
    res.status(200).json({ message: "logout-success" });
};