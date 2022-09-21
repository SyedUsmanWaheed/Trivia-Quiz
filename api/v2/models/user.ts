import mongoose, { Schema, Types } from "mongoose";
import { UserInterface } from "../intefaces/models.js";

const user_schema = new Schema<UserInterface>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, default: null },
    token: { type: String, default: null }
})


export default mongoose.model<UserInterface>("users", user_schema)