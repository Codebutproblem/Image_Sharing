import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
import Pin from "./pin.model.js";
import Table from "./table.model.js";

const PinTable = sequelize.define('PinTable', {
    pin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pin,
            key: 'id'
        }
    },
    table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Table,
            key: 'id'
        }
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, { 
    timestamps: false,
    freezeTableName: true 
});

export default PinTable;