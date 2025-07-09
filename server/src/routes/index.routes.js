import { Router } from "express";
import authRoutes from "./auth.routes.js";
import messageRoutes from "./message.routes.js";


const routes = Router();

routes.use("/auth",authRoutes);

routes.use("/messages",messageRoutes);

export default routes;