import Pin from "../../models/pin.model.js";
import TopicPin from "../../models/topic_pin.model.js";
import UserAccount from "../../models/user_account.model.js";
import sequelize from "../../../../config/database.js";
export const createPin = async (req, res) => {
    try {
        let data = req.body;
        data = {
            ...data,
            user_id : req.user.id,
        }
        const topics = data.topics;
        delete data.topics;
        const pin = await Pin.create(data);
        
        if(topics && topics.length > 0){
            topics.forEach(async (topicId) => {
                await TopicPin.create({
                    pin_id: pin.id,
                    topic_id: topicId
                });
            });
        }

        res.status(200).json({pin, message: "create-pin-success"});
    } catch (error) {
        console.log(error);
        res.status(502).json({message: "create-pin-failed"});
    }
};

export const getPins = async (req, res) => {
    try {
        const userId = req.user.id;
        const pins = await Pin.findAll({
            order: sequelize.random(),
            attributes: [
                "id",
                "title",
                "url",
                "user_id",
            ],
            where: {
                deleted: false
            },
            raw: true
        });

        for(const pin of pins){
            const user = await UserAccount.findOne({
                attributes: ["id","username", "avatar"],
                where: {
                    id: pin.user_id
                },
                raw: true
            });
            pin.user = user;
        }
        res.status(200).json({pins, message: "get-pins-success"});
    } catch (error) {
        console.log(error);
        res.status(502).json({message: "get-pins-failed"});
    }
};
