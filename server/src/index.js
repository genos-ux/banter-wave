import express from 'express';
import routes from './routes/index.routes.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);

app.listen(PORT,  async() => {
  console.log(`BanterWave API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});