import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
import slugify from 'slugify';
const Topic = sequelize.define('topic', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    hexa_color: DataTypes.STRING(10),
    slug: DataTypes.STRING(100),
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: DataTypes.DATE,
},{
    tableName: "topic",
    timestamps: true,
    hooks: {
        beforeCreate: (topic) => {
            if(!topic.slug){
                topic.slug = slugify(topic.name)+ "." + (new Date()).getTime().toString();
            }
        },
        beforeUpdate: (topic) => {
            if(topic.changed('name')){
                topic.slug = slugify(topic.name)+ "." + (new Date()).getTime().toString();
            }
        }
    }
});

export default Topic;