import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    slug: DataTypes.STRING(100),
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: DataTypes.DATE,
}, {
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (table) => {
            if (!table.slug) {
                table.slug = `table${(new Date()).getTime().toString()}`;
            }
        },
    },
});

export default Table;