import express from 'express';
import routes from './routes/index.routes.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors(({
  origin: "http://localhost:5173",
  credentials: true
})))

app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorMiddleware);

app.listen(PORT,  async() => {
  console.log(`BanterWave API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});