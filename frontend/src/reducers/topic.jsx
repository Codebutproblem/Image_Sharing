const TopicReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TOPIC_ID":
            if(state.includes(action.id)){
                return state;
            }
            return [...state, action.id];
        case "REMOVE_TOPIC_ID":
            return state.filter((id) => id !== action.id);
        case "CLEAR_TOPIC_IDS":
            return [];
        default:
            return state;
    }
}

export default TopicReducer;