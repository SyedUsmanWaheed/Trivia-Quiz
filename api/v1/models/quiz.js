import mongoose, { Schema } from "mongoose";
import { Category } from "./category.js";
import { User } from "./user.js";

const quiz_schema = new Schema({
    poster_id: { type: String, required: true, ref: User },
    category_id: { type: String, required: true, ref: Category },
    attendees: [
        { type: String, required: true, ref: User }
    ],
    questions: [{
        question: { type: String, required: true },
        options: {
            op1: { type: String, required: true },
            op2: { type: String, required: true },
            op3: { type: String, required: true },
            op4: { type: String, required: true }
        },
        answer: { type: String, required: true }
    }]
})

export const Quiz = mongoose.model("quiz", quiz_schema)
