export const setUser = (user) => {
    return {
        type: "SET_USER",
        user: user
    }
};

export const deleteUser = () => {
    return {
        type: "DELETE_USER"
    }
};