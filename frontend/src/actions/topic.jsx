export function addTopicId(id) {
  return {
    type: "ADD_TOPIC_ID",
    id: id
  };
}

export function removeTopicId(id) {
  return {
    type: "REMOVE_TOPIC_ID",
    id: id
  };
}

export function clearTopicIds() {
  return {
    type: "CLEAR_TOPIC_IDS"
  };
}