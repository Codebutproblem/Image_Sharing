import { combineReducers } from "redux";
import UploadReducer from "./uploader";
import TopicReducer from "./topic";
import { AlertReducer, LoadingReducer } from "./other";
import UserReducer from "./user";

const allReducers = combineReducers({
  UploadReducer,
  AlertReducer,
  LoadingReducer,
  TopicReducer,
  UserReducer
});

export default allReducers;
