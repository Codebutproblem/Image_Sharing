import { del, get, patch, post } from "../requests/request";

export const createTable = async (tableName) => {
  const result = await post("tables/create", { name: tableName });
  return result;
};

export const getAllUserTables = async () => {
  const result = await get("tables");
  return result;
};

export const getUserTables = async (userSlug, { limit, page }) => {
  const result = await get(`tables/${userSlug}?limit=${limit}&page=${page}`);
  return result;
};

export const updateTableName = async (tableSlug, tableName) => {
  const result = await patch(`tables/update/${tableSlug}`, { name: tableName });
  return result;
};

export const deleteTable = async (tableSlug) => {
  const result = await del(`tables/delete/${tableSlug}`);
  return result;
};
