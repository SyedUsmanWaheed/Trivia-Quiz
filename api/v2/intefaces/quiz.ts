import { Document, Types } from "mongoose";


export interface Quiz {
    _id? : Types.ObjectId,
    poster_id: String ,
    category_id:  String ,
    attendees: [
        String 
    ],
    questions: [{
        question: String ,
        options: {
            op1: String ,
            op2: String ,
            op3: String ,
            op4: String 
        },
        answer: String
    }]
    __v?: Number
}
export type QuizInterface = Quiz & Document