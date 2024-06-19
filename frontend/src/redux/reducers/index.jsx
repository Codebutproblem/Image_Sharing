import { combineReducers } from "redux";
import UploadReducer from "./uploader";
import TopicReducer from "./topic";
import { AlertReducer, LoadingReducer } from "./other";
import UserReducer from "./user";
import { SaveBoxReducer } from "./other";

const allReducers = combineReducers({
  UploadReducer,
  AlertReducer,
  LoadingReducer,
  TopicReducer,
  UserReducer,
  SaveBoxReducer,
});

export default allReducers;
