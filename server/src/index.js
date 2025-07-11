import express from 'express';
import routes from './routes/index.routes.js';
import { NODE_ENV, PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from './lib/socket.js';
import path from "path";

const __dirname = path.resolve();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use(cors(({
  origin: "http://localhost:5173",
  credentials: true
})))

app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorMiddleware);

if(NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../app/dist")));


  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"));
  })
}

server.listen(PORT,  async() => {
  console.log(`BanterWave API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});