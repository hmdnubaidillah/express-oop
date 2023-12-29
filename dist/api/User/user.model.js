import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minLength: [3, "Username length must be a minimum of 3 characters."],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password length must be a minimum of 8 characters."],
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});
export const User = model("User", UserSchema);
