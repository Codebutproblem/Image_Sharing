
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
        const pin = await createPinService(data);
        res.status(200).json({ pin, message: "create-pin-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "create-pin-failed" });
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

        res.status(200).json({ pins, total_pages: total_pages , message: "get-pins-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "get-pins-failed" });
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
            return res.status(200).json({ pins: [], message: "get-pins-by-topic-success" });
        }

        const pins = await getPinsByTopicService({ offset, limit }, topicIds);

        const totalPins = await countPinsByTopicService(topicIds);

        const total_pages = Math.ceil(totalPins / limit);
        res.status(200).json({ pins,total_pages: total_pages, message: "get-pins-by-topic-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "get-pins-by-topic-failed" });
    }
};
