import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


export const ensureAuthenticated = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({ message: "Unauthorized - No Token Provided." });


        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) return res.status(401).json({ message: "Unauthorized - Invalid token" });

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(404).json({ message: "User not found" });

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in ensureAuthenticated middleware: ", error.message);
        next(error);
    }
}