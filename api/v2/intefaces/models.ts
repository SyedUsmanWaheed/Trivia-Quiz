import { Document, Types } from "mongoose"

export interface User {
    _id?: Types.ObjectId
    name: string,
    email: string,
    type: string,
    password: string,
    token?: string | null
    __v?: number
}

export type UserInterface = User & Document