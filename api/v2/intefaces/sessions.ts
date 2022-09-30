import { Document } from "mongoose"

export interface Sessions{
    _id?: Number
    user_id: String,
    device_id:String,
    token: String,
    created_at?: Number
    __v?: Number
} 


export type SessionsInterface = Sessions & Document