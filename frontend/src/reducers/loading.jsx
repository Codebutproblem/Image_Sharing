const LoadingReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_LOADING":
            return action.loading;
        default:
            return state;
    }
}

export default LoadingReducer;