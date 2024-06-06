import { getAllTopicsService } from "../services/topic.service.js";

export const getAllTopics = async (req, res) => {
    try {
        
        const sorted = req.query.sorted;

        const topics = await getAllTopicsService(sorted);
        res.status(200).json({ topics, message: "get-all-topics-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "get-all-topics-failed" });
    }
}