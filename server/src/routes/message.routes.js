import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";

const messageRoutes = Router();

messageRoutes.get("/users", ensureAuthenticated, getUsers);

messageRoutes.get("/:id", ensureAuthenticated, getMessages);

messageRoutes.post("/send/:id", ensureAuthenticated, sendMessage);

export default messageRoutes;