import { Document, Types } from "mongoose"

export interface User {
    _id?: Types.ObjectId
    name: string,
    email: string,
    type: string,
    password: string,
    token?: string | null
    fcm_token?: string|null
    web_socket?: string|null
    location?: {
        type: string
        coordinates: [Number]
    }
    __v?: number
}

export type UserInterface = User & Document