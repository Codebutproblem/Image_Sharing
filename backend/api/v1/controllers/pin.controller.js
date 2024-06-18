
import HttpStatusCode from "../../../config/http_status.js";
import ResponseMessage from "../../../config/message.js";
import { 
    countAllPinsService, 
    countPinsByTopicService, 
    countUserPinsService, 
    createPinService, 
    deletePinService, 
    getAllPinsService, 
    getDetailUserPinService, 
    getPinDetailService, 
    getPinsByTopicService, 
    getRecommendPinsService,
    getUserPinsService,
    savePinService,
    setLovePinService,
    unsavedPinService,
    updatePinService
} from "../services/pin.service.js";

export const createPin = async (req, res) => {
    try {
        const rawData = req.body;
        const data = {
            ...rawData,
            user_id: req.user.id,
        }
        await createPinService(data);
        res.status(HttpStatusCode.CREATED).json({ message: ResponseMessage.CREATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.CREATE_FAILED });
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

        res.status(HttpStatusCode.OK).json({ pins, total_pages: total_pages , message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
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
            return res.status(HttpStatusCode.OK).json({ pins: [], message: ResponseMessage.GET_SUCCESS });
        }

        const pins = await getPinsByTopicService({ offset, limit }, topicIds);

        const totalPins = await countPinsByTopicService(topicIds);

        const total_pages = Math.ceil(totalPins / limit);
        res.status(HttpStatusCode.OK).json({ pins,total_pages: total_pages, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const getPinDetail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const pin = await getPinDetailService(slug);
        res.status(HttpStatusCode.OK).json({ pin, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const getRecommendPins = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 7;
        const slug = req.params.slug;
        const pins = await getRecommendPinsService(slug, limit);
        res.status(HttpStatusCode.OK).json({ pins, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const setLovePin = async (req, res) => {
    try {
        const pinId = req.params.pinId;
        const userId = req.user.id;
        await setLovePinService(pinId, userId);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};

export const savePin = async (req, res) => {
    try {
        const pinId = parseInt(req.body.pinId);
        const tableId = parseInt(req.body.tableId);
        await savePinService(pinId, tableId);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};

export const unSavePin = async (req, res) => {
    try {
        const pinId = parseInt(req.params.id);
        const userId = req.user.id;
        await unsavedPinService(pinId, userId);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};

export const getUserPins = async (req, res) => {
    try {
        const userSlug = req.params.user_slug;
        const limit = parseInt(req.query.limit) || 16;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const pins = await getUserPinsService(userSlug, {offset, limit});
        const totalPins = await countUserPinsService(userSlug);
        const total_pages = Math.ceil(totalPins / limit);
        res.status(HttpStatusCode.OK).json({ pins, total_pages: total_pages, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};


export const getDetailUserPin = async (req, res) => {
    try {
        const slug = req.params.slug;
        const userId = req.user.id;
        const pin = await getDetailUserPinService(slug, userId);
        res.status(HttpStatusCode.OK).json({ pin, message: ResponseMessage.GET_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.GET_FAILED });
    }
};

export const updatePin = async (req, res) => {
    try {
        const data = req.body;
        const slug = req.params.slug;
        await updatePinService(slug, data);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.UPDATE_FAILED });
    }
};

export const deletePin = async (req, res) => {
    try {
        const slug = req.params.slug;
        await deletePinService(slug);
        res.status(HttpStatusCode.OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.DELETE_FAILED });
    }
};