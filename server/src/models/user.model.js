import { model, Schema } from "mongoose";

const userSchema = Schema({
  email: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address."],
  },
  fullName: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
    minLength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  }
},{ timestamps: true });

const User = model("User", userSchema);

export default User;