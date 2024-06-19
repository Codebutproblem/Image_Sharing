const initialState = {
  title: "",
  description: "",
  tableId: null,
  topics: [],
  allowComment: true,
  allowRecommend: true,
  file: null,
  allowUpload: false,
};

function UploadReducer(state = initialState, action = null) {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.title,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.description,
      };
    case "ADD_TOPIC":
      return {
        ...state,
        topics: state.topics.concat(action.topic),
      };
    case "REMOVE_TOPIC":
      return {
        ...state,
        topics: state.topics.filter((topic) => topic.id !== action.id),
      };
    case "UPDATE_ALLOW_COMMENT":
      return {
        ...state,
        allowComment: action.isAllowed,
      };
    case "UPDATE_ALLOW_RECOMMEND":
      return {
        ...state,
        allowRecommend: action.isAllowed,
      };
    case "UPDATE_IMAGE":
      return {
        ...state,
        file: action.file,
      };
    case "UPDATE_TABLE":
      return {
        ...state,
        tableId: action.id,
      };
    case "RESET":
      return initialState;
    case "ALLOW_UPLOAD":
      return {
        ...state,
        allowUpload: action.allow,
      };
    case "SET_UPLOADER":
      return {
        ...state,
        ...action.uploader,
      };
    default:
      return state;
  }
}

export default UploadReducer;
