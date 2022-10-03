import mongoose, { Schema, Types } from "mongoose";
import { UserInterface } from "../intefaces/models.js";

const user_schema = new Schema<UserInterface>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, default: null },
    token: { type: String, default: null },
    fcm_token: { type: String, default: null },
    web_socket: { type: String, default: null },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: {type: [Number], required: true}
    }
})

user_schema.index({ location: '2dsphere' });

export default mongoose.model<UserInterface>("users", user_schema)