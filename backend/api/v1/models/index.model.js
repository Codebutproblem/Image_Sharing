import UserAccount from "./user_account.model.js";
import Pin from "./pin.model.js";
import TopicPin from "./topic_pin.model.js";
import Topic from "./topic.model.js";
import OTPEmail from "./otp_email.model.js";

UserAccount.hasMany(Pin, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Pin.belongsTo(UserAccount, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
);

Topic.belongsToMany(Pin, { through: TopicPin, foreignKey: 'topic_id' });
Pin.belongsToMany(Topic, { through: TopicPin, foreignKey: 'pin_id' });

export {
    UserAccount,
    Pin,
    TopicPin,
    Topic,
    OTPEmail
}