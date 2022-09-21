import mongoose, { Schema } from "mongoose";
import { Quiz } from "./quiz.js";
import { User } from "./user.js";

const report_schema = new Schema({
    quiz_id: {type: String, required: true, ref: Quiz},
    user_id: {type: String, required: true, ref: User},
    stats: {
        correct: {type: Number, required: true},
        incorrect: {type: Number, required: true},
        percentage: {type: Number, required: true}
    }
})

export const Report =  mongoose.model("reports", report_schema)