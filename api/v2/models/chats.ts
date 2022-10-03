import mongoose, { Schema, Types } from "mongoose";
import { ChatInterface, ChatRoomInterface } from "../intefaces/chats";



const chats_schema : Schema<ChatInterface> = new Schema({
    from: { type: Schema.Types.ObjectId, required: true },
    to: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    status: { type: String, default: "sent" }
})

export const Chat = mongoose.model("chats", chats_schema)

const chats_room_schema : Schema <ChatRoomInterface>= new Schema({
    user1: { type: Schema.Types.ObjectId, required: true },
    user2: { type: Schema.Types.ObjectId, required: true },
    created_at: { type: Number, required: true }
})

export const ChatRoom =  mongoose.model("chat_rooms", chats_room_schema)

