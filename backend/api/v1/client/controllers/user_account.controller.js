import UserAccount from "../../models/user_account.model.js";

export const getInfoUserAccount = (req, res) => {
    const user = req.user;
    res.status(200).json({ user, message: "get-info-success" });
};

export const verifyLogin = (req, res) => {
    res.status(200).json({ message: "verify-success" });
}