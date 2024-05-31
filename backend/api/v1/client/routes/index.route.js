import { authToken } from "../middlewares/auth.middleware.js";
import UserAccountRoutes from "./user_account.route.js";
import TopicRoutes from "./topic.route.js";
import PinRoutes from "./pin.route.js";
const clientRoutes = (app) => {
    const API_PATH = "/api/v1";
    app.use(authToken);
    app.use(`${API_PATH}/topics`, TopicRoutes);
    app.use(`${API_PATH}/user-account`, UserAccountRoutes);
    app.use(`${API_PATH}/pins`,  PinRoutes);
}

export default clientRoutes;