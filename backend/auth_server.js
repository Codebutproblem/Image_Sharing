import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import sequelize from './config/database.js';
import clientAuthRoutes from './api/v1/client/auth_routes/index.route.js';

dotenv.config();

sequelize;
await sequelize.sync();

const app = express();
const port = process.env.AUTH_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

clientAuthRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})