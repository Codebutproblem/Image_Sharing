import { Topic } from "../models/index.model.js";

export const getAllTopicsService = async (sorted) => {
    const find = {
        atrributes: ["id", "name", "hexa_color", "slug"],
        where: {
            deleted: false
        }
    }

    if (sorted) {
        find.order = [
            [
                sorted.split('-')[0],
                sorted.split('-')[1],
            ]
        ]
    }

    const topics = await Topic.findAll(find);

    return topics;
}