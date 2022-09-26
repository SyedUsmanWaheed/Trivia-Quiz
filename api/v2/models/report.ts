import mongoose, { Schema } from "mongoose";
import { ReportInterface } from "../intefaces/report.js";


const report_schema = new Schema<ReportInterface>({
    quiz_id: {type: String, required: true },
    user_id: {type: String, required: true},
    stats: {
        correct: {type: Number, required: true},
        incorrect: {type: Number, required: true},
        percentage: {type: Number, required: true}
    }
})

export default mongoose.model<ReportInterface>("reports", report_schema)