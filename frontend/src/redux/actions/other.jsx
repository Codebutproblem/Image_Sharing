export const showAlert = (data) => {
  return {
    type: "SHOW_ALERT",
    data: data,
  };
};

export const showLoading = (loading) => {
  return {
    type: "SHOW_LOADING",
    loading: loading,
  };
};

export const setSaveBox = (data) => {
  return {
    type: "SET_SAVE_BOX",
    data: data,
  };
};
