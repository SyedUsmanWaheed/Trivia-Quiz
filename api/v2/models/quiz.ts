import mongoose, { Schema } from "mongoose";
import { QuizInterface } from "../intefaces/quiz.js";


const quiz_schema  = new Schema<QuizInterface>({
    poster_id: { type: String, required: true },
    category_id: { type: String, required: true  },
    attendees: [
        { type: String, required: true }
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

export default mongoose.model<QuizInterface>("quiz", quiz_schema)