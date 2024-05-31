import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import sequelize from './config/database.js';
import clientRoutes from './api/v1/client/routes/index.route.js';

dotenv.config();
sequelize;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

clientRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})