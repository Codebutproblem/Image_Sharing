import { combineReducers } from "redux";
import UploadReducer from "./uploader";
import AlertReducer from "./alert";
import LoadingReducer from "./loading";
import TopicReducer from "./topic";

const allReducers = combineReducers({
    UploadReducer,
    AlertReducer,
    LoadingReducer,
    TopicReducer
});

export default allReducers;
