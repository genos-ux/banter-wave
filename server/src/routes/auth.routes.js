import { Router } from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.put("/update-profile",ensureAuthenticated, updateProfile);

authRoutes.get("/check", ensureAuthenticated, checkAuth);

export default authRoutes;