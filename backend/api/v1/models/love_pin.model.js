import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
import Pin from "./pin.model.js";
import UserAccount from "./user_account.model.js";

const LovePin = sequelize.define("LovePin", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserAccount,
            key: "id",
        },
    },
    pin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pin,
            key: "id",
        },
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default LovePin;