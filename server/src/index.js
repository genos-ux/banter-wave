import express from 'express';
import routes from './routes/index.routes.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

// const PORT = 4000;

app.use("/api/v1", routes);

app.listen(PORT,  async() => {
  console.log(`BanterWave API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});