import { Types } from "mongoose"

export interface DataResponse {
    error: Boolean,
    info: String,
    data?: any | null
}

export interface JwtTokenData {
    user_id: Types.ObjectId,
    timestamp: number
}