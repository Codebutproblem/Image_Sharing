import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: DataTypes.DATE,
},{
    freezeTableName: true,
    timestamps: true,
});

export default Comment;