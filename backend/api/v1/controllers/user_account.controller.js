import { HttpStatusCode, ResponseMessage } from "../../../config/system.js";

export const getInfoUserAccount = (req, res) => {
    const user = req.user;
    res.status(HttpStatusCode.OK).json({ user, message: ResponseMessage.GET_SUCCESS });
};

export const verifyLogin = (req, res) => {
    res.status(HttpStatusCode.OK).json({ message: ResponseMessage.VERIFY_SUCCESS });
}