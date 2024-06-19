import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const Search = sequelize.define('Search', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default Search;