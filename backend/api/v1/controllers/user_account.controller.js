import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";

export const getInfoUserAccount = (req, res) => {
    const user = req.user;
    res.status(HttpStatusCode.OK).json({ user, message: ResponseMessage.GET_SUCCESS });
};

export const verifyLogin = (req, res) => {
    res.status(HttpStatusCode.OK).json({ user: req.user , message: ResponseMessage.VERIFY_SUCCESS });
}