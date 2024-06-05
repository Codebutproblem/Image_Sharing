import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
import Topic from "./topic.model.js";
import Pin from "./pin.model.js";
const TopicPin = sequelize.define('TopicPin', {
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Topic,
            key: 'id'
        }
    },
    pin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pin,
            key: 'id'
        }
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},{
    freezeTableName: true,
    timestamps: false
});

export default TopicPin;