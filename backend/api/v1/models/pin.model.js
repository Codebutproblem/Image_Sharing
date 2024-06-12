import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const Pin = sequelize.define("Pin", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    slug: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    allow_comment: DataTypes.BOOLEAN,
    allow_recommend: DataTypes.BOOLEAN,

    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    deletedAt: DataTypes.DATE
    
}, {
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (pin) => {
            if(!pin.slug){
                pin.slug = `pin${(new Date()).getTime().toString()}`;
            }
        }
    }
});

export default Pin;
