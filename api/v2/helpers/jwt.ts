import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { JwtTokenData } from "../intefaces/interface.js";

export function sign_token(payload: JwtTokenData): string {
    let secretKey: jwt.Secret = process.env.APPJWTKEY || "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67"
    return jwt.sign(payload, secretKey)
}

export function verify_token(token: string): JwtPayload {

    let secretKey: jwt.Secret = "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67" || ""
    let verified_data: string | JwtPayload = jwt.verify(token, secretKey)
    return typeof (verified_data) === "string" ? { user_id: new Types.ObjectId(""), timestamp: Date.now() } : verified_data
}