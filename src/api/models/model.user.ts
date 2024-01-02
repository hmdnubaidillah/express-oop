import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    lowercase: true,
  },

  lastname: {
    type: String,
    required: [true, "Last name is required"],
    lowercase: true,
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [3, "Username length must be a minimum of 3 characters."],
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password length must be a minimum of 8 characters."],
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", UserSchema);
