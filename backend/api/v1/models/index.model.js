import UserAccount from "./user_account.model.js";
import Pin from "./pin.model.js";
import TopicPin from "./topic_pin.model.js";
import Topic from "./topic.model.js";
import OTPEmail from "./otp_email.model.js";
import LovePin from "./love_pin.model.js";
import Comment from "./comment.model.js";
UserAccount.hasMany(Pin, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Pin.belongsTo(UserAccount, {
        as: "Author",
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
);

Topic.belongsToMany(Pin, { through: TopicPin, foreignKey: 'topic_id' });
Pin.belongsToMany(Topic, { through: TopicPin, foreignKey: 'pin_id' });

UserAccount.belongsToMany(Pin, { through: LovePin, foreignKey: 'user_id' });
Pin.belongsToMany(UserAccount, { as: "Lover", through: LovePin, foreignKey: 'pin_id' });

UserAccount.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(UserAccount, {
    as: "Author",
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

});
Pin.hasMany(Comment, {
    foreignKey: 'pin_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Pin, {
    foreignKey: 'pin_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export {
    UserAccount,
    Pin,
    TopicPin,
    Topic,
    OTPEmail,
    LovePin,
    Comment
}