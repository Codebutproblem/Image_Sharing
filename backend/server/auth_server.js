import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import authRoutes from '../api/v1/routes/auth.route.js';


const AuthServer = () => {
  const app = express();
  const port = process.env.AUTH_PORT || 3001;

  app.use(cors());
  app.use(bodyParser.json());

  authRoutes(app);

  app.listen(port, () => {
    console.log(`Auth server listening on port ${port}`)
  })
}

export default AuthServer;
