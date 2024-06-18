import { Op, literal } from "sequelize";
import sequelize from "../../../config/database.js";
import { Pin, TopicPin, UserAccount, Topic, LovePin, Table, PinTable } from "../models/index.model.js";

export const createPinService = async (data) => {
    const topicIds = data.topic_ids;
    delete data.topics;
    const pin = await Pin.create(data);
    
    if(data.table_id !== null) {
        await PinTable.create({
            table_id: data.table_id,
            pin_id: pin.id
        });
    }
    
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
        attributes: ["id", "title", "url", "createdAt", "slug"],
        where: {
            deleted: false
        },
        order: [
            ["createdAt", "DESC"]
        ],
        include: [
            {
                model: UserAccount,
                as: "Author",
                attributes: ["id", "username", "avatar", "slug"],
                where: {
                    deleted: false
                }
            },
            {
                model: UserAccount,
                as: "Lover",
                attributes: ["id"],
                through: {
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: Table,
                attributes: ["user_id"],
                where: {
                    deleted: false
                },
                through:{
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                required: false
            }
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
            "url",
            "slug"
        ],
        where: {
            deleted: false
        },
        include: [
            {
                model: Topic,
                attributes: [],
                where: {
                    id: topicIds,
                    deleted: false
                },
            },
            {
                model: UserAccount,
                as: "Author",
                attributes: ["id", "username", "avatar", "slug"],
                where: {
                    deleted: false
                }
            },
            {
                model: UserAccount,
                as: "Lover",
                attributes: ["id"],
                through: {
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: Table,
                attributes: ["user_id"],
                where: {
                    deleted: false
                },
                through:{
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                required: false
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
                    id: topicIds,
                    deleted: false
                }
            }
        ]
    });
    return totalPins;
};

export const getPinDetailService = async (slug) => {
    const pin = await Pin.findOne({
        attributes: [
            "id", 
            "title", 
            "url", 
            "description", 
            "allow_comment", 
            "allow_recommend", 
            "createdAt"
        ],
        where: {
            slug: slug,
            deleted: false
        },
        include: [
            {
                model: UserAccount,
                as: "Author",
                attributes: ["id", "username", "avatar", "slug"],
                where:{
                    deleted: false
                }
            },
            {
                model: Topic,
                attributes: ["id", "name", "hexa_color"],
                through: {
                    attributes: []
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: UserAccount,
                as: "Lover",
                attributes: ["id", "username", "avatar","slug"],
                through: {
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: Table,
                through:{
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                attributes: ["user_id"],
                required: false
            }
        ]
    });
    return pin;
};

export const getRecommendPinsService = async (slug, limit) => {
    const topicIds = (await Topic.findAll(
        {
            attributes: ["id"],
            where: {
                deleted: false,
            },
            include: {
                model: Pin,
                attributes: [],
                through: {
                    attributes: []
                },
                where: {
                    deleted: false,
                }
            },
            raw: true,
            group: ["Topic.id"]
        }
    )).map((topic) => topic.id);

    const pins = await Pin.findAll({
        attributes: ["id", "title", "url", "slug"],
        where: {
            deleted: false,
            slug: {
                [Op.ne]: slug
            }
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
                as: "Author",
                attributes: ["id", "username", "avatar", "slug"]
            },
            {
                model: UserAccount,
                as: "Lover",
                attributes: ["id"],
                through: {
                    attributes: []
                },
                where: {
                    deleted: false
                },
                required: false
            },{
                model: Table,
                attributes: ["user_id"],
                where: {
                    deleted: false
                },
                through:{
                    attributes: [],
                    where: {
                        deleted: false
                    }
                },
                required: false
            }
        ],
        order: sequelize.random(),
        limit: limit
    });
    return pins
};

export const setLovePinService = async (pinId, userId) => {
    const lovePin = await LovePin.findOne({
        where: {
            pin_id: pinId,
            user_id: userId,
        }
    });

    if (lovePin) {
        if(lovePin.deleted) {
            await lovePin.update({ deleted: false });
        } else{
            await lovePin.update({ deleted: true });
        }
    } 
    else {
        await LovePin.create({
            pin_id: pinId,
            user_id: userId
        });
    }
};

export const getPinBySlugService = async (slug) => {
    const pin = await Pin.findOne({
        where: {
            slug,
            deleted: false
        },
        raw: true
    });
    return pin;
};

export const savePinService = async (pinId, tableId) => {
    const pinTable = await PinTable.findOne({
        where: {
            table_id: tableId,
            pin_id: pinId
        }
    });
    if(pinTable) {
        await pinTable.update({ deleted: false });
    } 
    else {
        await PinTable.create({
            table_id: tableId,
            pin_id: pinId
        });
    }
};

export const unsavedPinService = async (pinId, userId) => {
    const table = await Table.findOne({
        where: {
            user_id: userId
        },
        include: {
            model: Pin,
            where: {
                id: pinId
            }
        },
        raw: true
    });
    await PinTable.update({deleted: true},{
        where: {
            table_id: table.id,
            pin_id: pinId
        }
    });
};

export const getUserPinsService = async (userSlug, pagination) => {
    const pins = await Pin.findAll({
        attributes: ["id", "title", "url", "createdAt", "slug"],
        where: {
            deleted: false
        },
        include: [
            {
                model: UserAccount,
                as: "Author",
                attributes: [],
                where: {
                    slug: userSlug,
                    deleted: false
                }
            },
            {
                model: UserAccount,
                as: "Lover",
                attributes: ["id"],
                through: {
                    attributes: []
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: Table,
                attributes: ["user_id"],
            }
        ],
        offset: pagination.offset,
        limit: pagination.limit,
        order: [
            ["createdAt", "DESC"]
        ]
    });
    return pins;
};

export const countUserPinsService = async (userSlug) => {
    const totalPins = await Pin.count({
        where: {
            deleted: false
        },
        include: [
            {
                model: UserAccount,
                as: "Author",
                attributes: [],
                where: {
                    slug: userSlug,
                    deleted: false
                }
            }
        ]
    });
    return totalPins;
};

export const getDetailUserPinService = async (slug, userId) => {
    const pin = await Pin.findOne({
        attributes: [
            "id", 
            "title", 
            "url", 
            "description", 
            "allow_comment", 
            "allow_recommend", 
            "createdAt"
        ],
        where: {
            slug: slug,
            deleted: false
        },
        include: [
            {
                model: Topic,
                attributes: ["id", "name", "hexa_color"],
                through: {
                    attributes: []
                },
                where: {
                    deleted: false
                },
                required: false
            },
            {
                model: Table,
                through:{
                    attributes: [],
                    where: {
                        deleted: false,
                    }
                },
                attributes: ["id","name"],
                where: {
                    user_id: userId,
                    deleted: false
                },
                required: false
            }
        ]
    });
    return pin;
};

export const getPinAuthor = async (slug) => {
    const user = await UserAccount.findOne({
        attributes: ["id", "username", "avatar", "slug"],
        where: {
            deleted: false
        },
        include:  {
            model: Pin,
            as: "Author",
            attributes: [],
            where: {
                slug: slug,
                deleted: false
            }
        },
        raw: true
    });
    return user;
};

export const updatePinService = async (slug, data) => {
    const topicIds = data.topic_ids;
    delete data.topics;
    const pin = await Pin.findOne({
        where: {
            slug: slug,
            deleted: false
        },
    });
    if(pin){
        await pin.update(data);
    }
    if(data.table_id !== null && pin){
        const pinTable = await PinTable.findOne({
            where: {
                pin_id: pin.id,
                table_id: data.table_id
            }
        });
        if(!pinTable){
            await PinTable.create({
                pin_id: pin.id,
                table_id: data.table_id
            });
        }
        else if(pinTable.deleted){
            await pinTable.update({deleted: false});
        }
    }

    if (topicIds && topicIds.length > 0 && pin) {
        topicIds.forEach(async (topicId) => {
            const topicPin = await TopicPin.findOne({
                where: {
                    pin_id: pin.id,
                    topic_id: topicId
                }
            });
            if(!topicPin){
                await TopicPin.create({
                    pin_id: pin.id,
                    topic_id: topicId
                });
            }
            else if(topicPin.deleted){
                await topicPin.update({deleted: false});
            }
        });
    }
};

export const findPinBySlugService = async (slug) => {
    const pin = await Pin.findOne({
        where: {
            slug: slug,
            deleted: false
        }
    });
    return pin;
};

export const deletePinService = async (slug) => {
    const pin = await Pin.update({deleted: true, deletedAt: new Date()},{
        where: {
            slug: slug,
            deleted: false
        }
    });
    return pin;
};