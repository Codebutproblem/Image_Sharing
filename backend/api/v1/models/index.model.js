import UserAccount from "./user_account.model.js";
import Pin from "./pin.model.js";
import TopicPin from "./topic_pin.model.js";
import Topic from "./topic.model.js";
import OTPEmail from "./otp_email.model.js";
import LovePin from "./love_pin.model.js";
import Comment from "./comment.model.js";
import Table from "./table.model.js";
import PinTable from "./pin_table.js";
import Search from "./search.model.js";
UserAccount.hasMany(Pin, {foreignKey: 'user_id'});
Pin.belongsTo(UserAccount, {as: "Author", foreignKey: 'user_id'});

Topic.belongsToMany(Pin, { through: TopicPin, foreignKey: 'topic_id' });
Pin.belongsToMany(Topic, { through: TopicPin, foreignKey: 'pin_id' });

UserAccount.belongsToMany(Pin, { through: LovePin, foreignKey: 'user_id' });
Pin.belongsToMany(UserAccount, { as: "Lover", through: LovePin, foreignKey: 'pin_id' });

UserAccount.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(UserAccount, {as: "Author", foreignKey: 'user_id'});
Pin.hasMany(Comment, {foreignKey: 'pin_id'});
Comment.belongsTo(Pin, {foreignKey: 'pin_id'});

UserAccount.hasMany(Table,{foreignKey: 'user_id'});
Table.belongsTo(UserAccount,{as: "Author",foreignKey: 'user_id'});
Table.belongsToMany(Pin, { through: PinTable, foreignKey: 'table_id' });
Pin.belongsToMany(Table, { through: PinTable, foreignKey: 'pin_id' });

UserAccount.hasMany(Search, {foreignKey: 'user_id'});
Search.belongsTo(UserAccount, {as: "Author", foreignKey: 'user_id'});

export {
    UserAccount,
    Pin,
    TopicPin,
    Topic,
    OTPEmail,
    LovePin,
    Comment,
    Table,
    PinTable,
    Search
}