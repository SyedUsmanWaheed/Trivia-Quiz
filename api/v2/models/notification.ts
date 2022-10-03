import mongoose, { Schema, Types } from "mongoose";
import { notificationInterface } from "../intefaces/notification";

let notification_schema = new Schema<notificationInterface>({

    user_id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true }

})

export default mongoose.model("Notification", notification_schema)