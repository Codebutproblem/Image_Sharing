export const updateTitle = (title) => {
  return {
    type: "UPDATE_TITLE",
    title: title,
  };
};

export const updateDesc = (description) => {
  return {
    type: "UPDATE_DESCRIPTION",
    description: description,
  };
};

export const addTopic = (topic) => {
  return {
    type: "ADD_TOPIC",
    topic: topic,
  };
};

export const removeTopic = (id) => {
  return {
    type: "REMOVE_TOPIC",
    id: id,
  };
};

export const updateAllowComment = (isAllowed) => {
  return {
    type: "UPDATE_ALLOW_COMMENT",
    isAllowed: isAllowed,
  };
};

export const updateAllowRecommend = (isAllowed) => {
  return {
    type: "UPDATE_ALLOW_RECOMMEND",
    isAllowed: isAllowed,
  };
};

export const updateImage = (file) => {
  return {
    type: "UPDATE_IMAGE",
    file: file,
  };
};

export const resetUploader = () => {
  return {
    type: "RESET",
  };
};

export const updateTable = (id) => {
  return {
    type: "UPDATE_TABLE",
    id: id,
  };
};
export const allowUpload = (allow) => {
  return {
    type: "ALLOW_UPLOAD",
    allow: allow,
  };
};