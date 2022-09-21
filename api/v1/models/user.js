import mongoose, { Schema } from "mongoose";



const user_schema = new Schema({
    name: {type: String , required: true},
    email: {type: String, required: true},
    type: {type:String, required: true},
    password: { type: String, default: null },
    token: { type: String, default: null }
})


export const User = mongoose.model("users", user_schema)