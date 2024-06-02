import { Sequelize } from "sequelize";
import Topic from "../../models/topic.model.js";

export const getAllTopics = async (req, res) => {
    try {
        const find = {
            atrributes: ["id", "name", "hexa_color", "slug"],
            where: {
                deleted: false
            }
        }
        const sorted = req.query.sorted;
        if (sorted) {
            find.order = [
                [
                    sorted.split('-')[0],
                    sorted.split('-')[1],
                ]
            ]
        }
        const topics = await Topic.findAll(find);
        res.status(200).json({ topics, message: "get-all-topics-success" });
    } catch (error) {
        res.status(502).json({ message: "get-all-topics-failed" });
    }
}