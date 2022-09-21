import { Document, Types } from "mongoose"

export interface User {
    _id?: Types.ObjectId
    name: String,
    email: String,
    type: String,
    password: String | null,
    token?: String | null
    __v?: Number
}

export type UserInterface = User & Document