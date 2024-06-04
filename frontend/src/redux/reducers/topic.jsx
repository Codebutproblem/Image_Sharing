const TopicReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TOPIC_TAG":
            return [...state, action.topic];
        case "REMOVE_TOPIC_TAG":
            return state.filter((topic) => topic.id !== action.id);
        case "CLEAR_TOPIC_TAGS":
            return [];
        default:
            return state;
    }
}

export default TopicReducer;