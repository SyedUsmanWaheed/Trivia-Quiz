import { Document, Types } from "mongoose"
export interface Report{
    _id :Types.ObjectId
    quiz_id: String,
    user_id: String,
    stats: {
        correct:  Number,
        incorrect: Number,
        percentage: Number,
    }
    __v: Number
}

export type ReportInterface = Report & Document 