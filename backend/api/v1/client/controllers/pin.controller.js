import sequelize from "../../../../config/database.js";
import Pin from "../../models/pin.model.js";
import TopicPin from "../../models/topic_pin.model.js";
import UserAccount from "../../models/user_account.model.js";
import { Sequelize } from "sequelize";
export const createPin = async (req, res) => {
    try {
        let data = req.body;
        data = {
            ...data,
            user_id: req.user.id,
        }
        const topics = data.topics;
        delete data.topics;
        const pin = await Pin.create(data);

        if (topics && topics.length > 0) {
            topics.forEach(async (topicId) => {
                await TopicPin.create({
                    pin_id: pin.id,
                    topic_id: topicId
                });
            });
        }

        res.status(200).json({ pin, message: "create-pin-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "create-pin-failed" });
    }
};

export const getPins = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 13;
        const offset = (page - 1) * limit;
        const pins = await Pin.findAll({
            attributes: ["id", "title", "url", "user_id", "createdAt"],
            where: {
                deleted: false
            },
            order: [
                ["createdAt", "DESC"]
            ],
            offset: offset, 
            limit: limit, 
            raw: true
        });

        for (const pin of pins) {
            const user = await UserAccount.findOne({
                attributes: ["id", "username", "avatar"],
                where: {
                    id: pin.user_id
                },
                raw: true
            });
            pin.user = user;
        }

        const totalPins = await Pin.count({
            where: {
                deleted: false
            }
        });

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
        const limit = parseInt(req.query.limit) || 13;
        const offset = (page - 1) * limit;

        const topicSelected = req.body.selectedTopics;
        const topicIds = topicSelected.map((topic) => topic.id);
        if(!topicIds || topicIds.length === 0){
            return res.status(200).json({ pins: [], message: "get-pins-by-topic-success" });
        }
        let condition = [];
        for (const topicId of topicIds) {
            condition.push(`tp.topic_id = ${topicId}`);
        }
        const pins = await sequelize.query(`
            SELECT p.id, p.title, p.url, p.user_id, p.createdAt from pin p
            inner join topic_pin tp on p.id = tp.pin_id
            where p.deleted = false and (${condition.join(" or ")})
            group by p.id
            order by p.createdAt desc
            LIMIT ${limit} OFFSET ${offset}
        `, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

        for (const pin of pins) {
            const user = await UserAccount.findOne({
                attributes: ["id", "username", "avatar"],
                where: {
                    id: pin.user_id
                },
                raw: true
            });
            pin.user = user;
        }

        const allPinsByTopic = await sequelize.query(`
            SELECT p.id as totalPins from pin p
            inner join topic_pin tp on p.id = tp.pin_id
            where p.deleted = false and (${condition.join(" or ")})
            group by p.id
        `, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });
        const total_pages = Math.ceil(allPinsByTopic.length / limit);
        res.status(200).json({ pins,total_pages: total_pages, message: "get-pins-by-topic-success" });
    } catch (error) {
        console.log(error);
        res.status(502).json({ message: "get-pins-by-topic-failed" });
    }
};
