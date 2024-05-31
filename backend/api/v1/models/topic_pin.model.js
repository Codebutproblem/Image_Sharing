import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const TopicPin = sequelize.define('TopicPin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},{
    tableName: 'topic_pin',
    timestamps: false
});

export default TopicPin;