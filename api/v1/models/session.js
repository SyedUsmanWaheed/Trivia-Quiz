import mongoose, { Schema } from "mongoose";

let session_schema = new Schema({
    user_id: { type: String, required: true },
    device_id: { type: String, required: true },
    token: { type: String, required: true },
    created_at: { type: Number, required: true }
})

export default mongoose.model("session", session_schema)