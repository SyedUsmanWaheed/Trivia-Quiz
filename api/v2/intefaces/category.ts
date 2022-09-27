import { Document, Types } from "mongoose"

export interface Category {
    _id?: Types.ObjectId
    name: String,
    __v?: Number
}

export type CategoryInterface = Category & Document