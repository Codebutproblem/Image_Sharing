import { Pin, TopicPin, UserAccount, Topic } from "../models/index.model.js";

export const createPinService = async (data) => {
    const topicIds = data.topic_ids;
    delete data.topics;
    const pin = await Pin.create(data);

    if (topicIds && topicIds.length > 0) {
        topicIds.forEach(async (topicId) => {
            await TopicPin.create({
                pin_id: pin.id,
                topic_id: topicId
            });
        });
    }
    return pin;
}

export const getAllPinsService = async (pagination) => {
    const pins = await Pin.findAll({
        attributes: ["id", "title", "url"],
        where: {
            deleted: false
        },
        include: {
            model: UserAccount,
            attributes: ["id", "username", "avatar"]
        },
        order: [
            ["createdAt", "DESC"]
        ],
        offset: pagination.offset,
        limit: pagination.limit,
    });

    return pins;
}

export const countAllPinsService = async () => {
    const totalPins = await Pin.count({
        where: {
            deleted: false
        }
    });
    return totalPins;
};

export const getPinsByTopicService = async (pagination, topicIds) => {
    const pins = await Pin.findAll({
        attributes: [
            "id",
            "title", 
            "url"
        ],
        where: {
            deleted: false
        },
        include: [
            {
                model: Topic,
                attributes: [],
                where: {
                    id: topicIds
                }
            },
            {
                model: UserAccount,
                attributes: ["id", "username", "avatar"]
            }
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        group: ["Pin.id"]
    });

    return pins;
}

export const countPinsByTopicService = async (topicIds) => {
    const totalPins = await Pin.count({
        distinct: true,
        col: "id",
        where: {
            deleted: false
        },
        include: [
            {
                model: Topic,
                attributes: [],
                where: {
                    id: topicIds
                }
            }
        ]
    });
    return totalPins;
};