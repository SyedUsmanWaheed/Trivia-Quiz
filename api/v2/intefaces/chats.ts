import { Document, Number, Types } from "mongoose";

export interface Chat {
    _id?: Number
    from: Types.ObjectId,
    to: Types.ObjectId,
    content: String,
    status: String
    __v?: Number
}
export type ChatInterface = Chat & Document

export interface chat_room {
    _id? : Number
    user1: Types.ObjectId,
    user2:  Types.ObjectId,
    created_at: Number
    __v?: Number
}

export type ChatRoomInterface = chat_room & Document 