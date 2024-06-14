import { authToken } from "../middlewares/auth.middleware.js";
import UserAccountRoutes from "./user_account.route.js";
import TopicRoutes from "./topic.route.js";
import PinRoutes from "./pin.route.js";
import commentRoutes from "./comment.route.js";
import tableRoutes from "./table.route.js";
const routes = (app) => {
    const API_PATH = "/api/v1";
    app.use(authToken);
    app.use(`${API_PATH}/topics`, TopicRoutes);
    app.use(`${API_PATH}/user-account`, UserAccountRoutes);
    app.use(`${API_PATH}/pins`,  PinRoutes);
    app.use(`${API_PATH}/comments`,  commentRoutes);
    app.use(`${API_PATH}/tables`,  tableRoutes);
}

export default routes;