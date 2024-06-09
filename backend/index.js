import sequelize from "./config/database.js";
import dotenv from "dotenv";
import Server from "./server/server.js";
import AuthServer from "./server/auth_server.js";

dotenv.config();

sequelize;

Server();
AuthServer();