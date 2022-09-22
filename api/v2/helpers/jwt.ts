import jwt from "jsonwebtoken";

export function sign_token(data: any) {
    let payload: string = data
    let secretKey: jwt.Secret = process.env.APPJWTKEY || ""
    return jwt.sign(payload, secretKey)
}

export function verify_token(token: string) {

    let secretKey: jwt.Secret = process.env.APPJWTKEY || ""
    let token1: string = token
    return jwt.verify(token1, secretKey)
}