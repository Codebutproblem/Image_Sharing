export const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return action.loading;
    default:
      return state;
  }
};

export const AlertReducer = (
  state = { type: "hidden", message: "" },
  action,
) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return action.data;
    default:
      return state;
  }
};

export const SaveBoxReducer = (
  state = { show: false, pinId: null },
  action,
) => {
  switch (action.type) {
    case "SET_SAVE_BOX":
      return action.data;
    default:
      return state;
  }
};
