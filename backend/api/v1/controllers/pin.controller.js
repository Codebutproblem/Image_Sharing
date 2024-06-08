
import { HttpStatusCode, ResponseMessage } from "../../../config/system.js";
import { 
    countAllPinsService, 
    countPinsByTopicService, 
    createPinService, 
    getAllPinsService, 
    getPinsByTopicService 
} from "../services/pin.service.js";

export const createPin = async (req, res) => {
    try {
        const rawData = req.body;
        const data = {
            ...rawData,
            user_id: req.user.id,
        }
        await createPinService(data);
        res.status(HttpStatusCode.CREATED).json({ message: ResponseMessage.CREATE_PIN_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_PIN_FAILED });
    }
};

export const getPins = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;

        const pins = await getAllPinsService({ offset, limit });
        
        const totalPins = await countAllPinsService();

        const total_pages = Math.ceil(totalPins / limit);

        res.status(HttpStatusCode.OK).json({ pins, total_pages: total_pages , message: ResponseMessage.GET_PINS_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_PINS_FAILED });
    }
};

export const getPinsByTopic = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;

        const topicSelected = req.body.selectedTopics;
        const topicIds = topicSelected.map((topic) => topic.id);
        if(!topicIds || topicIds.length === 0){
            return res.status(HttpStatusCode.OK).json({ pins: [], message: ResponseMessage.GET_PINS_BY_TOPIC_SUCCESS });
        }

        const pins = await getPinsByTopicService({ offset, limit }, topicIds);

        const totalPins = await countPinsByTopicService(topicIds);

        const total_pages = Math.ceil(totalPins / limit);
        res.status(HttpStatusCode.OK).json({ pins,total_pages: total_pages, message: ResponseMessage.GET_PINS_BY_TOPIC_SUCCESS });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_PINS_BY_TOPIC_FAILED });
    }
};
