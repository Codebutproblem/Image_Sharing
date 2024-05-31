const TableReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TABLES":
      return action.tables;
    case "ADD_TABLE":
      return [...state, action.table];
    default:
      return state;
  }
};

export default TableReducer;
