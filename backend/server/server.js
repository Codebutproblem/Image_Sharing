import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import routes from '../api/v1/routes/index.route.js';

const Server = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(bodyParser.json());

  routes(app);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });
}

export default Server;

