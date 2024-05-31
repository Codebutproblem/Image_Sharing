import { combineReducers } from "redux";
import UploadReducer from "./uploader";
import AlertReducer from "./alert";
import LoadingReducer from "./loading";

const allReducers = combineReducers({
  UploadReducer,
  AlertReducer,
  LoadingReducer
});

export default allReducers;
