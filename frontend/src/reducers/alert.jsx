const AlertReducer = (state = {type: "hidden", message: ""}, action) => {
    switch (action.type) {
        case "SHOW_ALERT":
            return action.data;
        default:
            return state;
    }
};

export default AlertReducer;