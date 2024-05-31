export const addTable = (table) => {
  return {
    type: "ADD_TABLE",
    table: table,
  };
};

export const setTables = (tables) => {
  return {
    type: "SET_TABLES",
    tables: tables,
  };
};
