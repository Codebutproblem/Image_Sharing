import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { getInfoUserBySlugService, updateInfoUserService } from "../services/user_account.service.js";

export const getInfoUserAccount = (req, res) => {
    const user = req.user;
    console.log(user);
    res.status(HttpStatusCode.OK).json({ user, message: ResponseMessage.GET_SUCCESS });
};

export const verifyLogin = (req, res) => {
    res.status(HttpStatusCode.OK).json({ user: req.user , message: ResponseMessage.VERIFY_SUCCESS });
}

export const getInfoUserBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const user = await getInfoUserBySlugService(slug);
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: ResponseMessage.GET_FAILED });
        }
        const isMe = req.user.slug === slug ? true : false;
        res.status(HttpStatusCode.OK).json({ user, isMe, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const updateInfoUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await updateInfoUserService(userId, req.body);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};