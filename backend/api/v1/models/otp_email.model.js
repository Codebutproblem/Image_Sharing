import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const OTPEmail = sequelize.define("OTPEmail", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expireIn: {
        type: DataTypes.DATE,
        allowNull: false
    }  
},{
    freezeTableName: true,
    timestamps: false
});

export default OTPEmail;