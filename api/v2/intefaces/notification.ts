import { Document, Types } from "mongoose";

export interface Notification{
    _id?: Types.ObjectId
    user_id : Types.ObjectId,
    title: string,
    message: string
    __v?:number
}

export type notificationInterface = Notification & Document