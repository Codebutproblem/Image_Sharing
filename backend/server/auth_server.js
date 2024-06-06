import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import sequelize from '../config/database.js';
import authRoutes from '../api/v1/auth_routes/index.route.js';

dotenv.config();

sequelize;

const app = express();
const port = process.env.AUTH_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

authRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})