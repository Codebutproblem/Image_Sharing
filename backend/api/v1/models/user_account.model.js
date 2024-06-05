import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
import slugify from 'slugify';
import Pin from './pin.model.js';
const UserAccount = sequelize.define('UserAccount', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: "active",
        allowNull: false
    },
    avatar: DataTypes.TEXT,
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    introduce: DataTypes.TEXT,
    personal_link: DataTypes.STRING(255),
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING(50),
    language: {
        type: DataTypes.STRING(50),
        defaultValue: "Việt Nam",
        allowNull: false
    },
    nation: DataTypes.STRING(100),
    refreshToken: DataTypes.TEXT,
    slug: DataTypes.STRING(100),
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: DataTypes.DATE
},{
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (user) => {
            if(!user.slug){
                user.slug = slugify(user.username,{replacement: '_', lower:true}) + "." + (new Date()).getTime().toString();
                console.log(user.slug);
            }
        },
        beforeUpdate: (user) => {
            if(user.changed('username')){
                user.slug = slugify(user.username,{replacement: '_', lower:true}) + "." + (new Date()).getTime().toString();
            }
        }
    }
});

export default UserAccount;