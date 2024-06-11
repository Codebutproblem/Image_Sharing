export function addTopicTag(topic) {
  return {
    type: "ADD_TOPIC_TAG",
    topic: topic,
  };
}

export function removeTopicTag(id) {
  return {
    type: "REMOVE_TOPIC_TAG",
    id: id,
  };
}

export function clearTopicTags() {
  return {
    type: "CLEAR_TOPIC_TAGS",
  };
}
