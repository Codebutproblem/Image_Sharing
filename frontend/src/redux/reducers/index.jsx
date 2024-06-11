import { combineReducers } from "redux";
import UploadReducer from "./uploader";
import TopicReducer from "./topic";
import { AlertReducer, LoadingReducer } from "./other";

const allReducers = combineReducers({
  UploadReducer,
  AlertReducer,
  LoadingReducer,
  TopicReducer,
});

export default allReducers;
