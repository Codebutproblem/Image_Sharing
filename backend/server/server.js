import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import sequelize from '../config/database.js';
import routes from '../api/v1/routes/index.route.js';
dotenv.config();

sequelize;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});