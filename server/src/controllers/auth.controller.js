import mongoose from "mongoose";
import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/user.validator.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { error, value } = registerUserValidator.validate(req.body);

    if (error) {
      const error = new Error("Validation error");
      error.statusCode = 409;
      throw error;
    }

    const existingUser = await User.findOne({ email: value.email });

    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(value.password, salt);

    const newUser = await User.create({
      ...value,
      password: hashedPassword,
    });

    //generate token
    generateToken(newUser._id, res);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const login = async(req, res, next) => {
  try {
    const { error, value } = loginUserValidator.validate(req.body);

    if (error) {
      const error = new Error("Validation error");
      error.statusCode = 409;
      throw error;
    }

    const existingUser = await User.findOne({ email: value.email });
    if(!existingUser) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect= bcrypt.compareSync(value.password, existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generateToken(existingUser._id,res);

    res.status(200).json({
        _id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
        profilePic: existingUser.profilePic
    })

  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    next(error);
  }
};
export const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    next(error);
  }
};
