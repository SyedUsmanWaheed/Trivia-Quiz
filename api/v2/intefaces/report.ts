import { Document, Types } from "mongoose"
export interface Report {
    _id?: Types.ObjectId
    quiz_id: Types.ObjectId,
    user_id: Types.ObjectId,
    stats: {
        correct: number,
        incorrect: number,
        percentage: number,
    }
    __v?: number
}

export type ReportInterface = Report & Document 