import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { getAllTopicsService } from "../services/topic.service.js";

export const getAllTopics = async (req, res) => {
    try {
        
        const sorted = req.query.sorted;

        const topics = await getAllTopicsService(sorted);
        res.status(HttpStatusCode.OK).json({ topics, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
}