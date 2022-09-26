import jwt from "jsonwebtoken";

export function sign_token(data: any) {
    let payload: string = data
    let secretKey: jwt.Secret = "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67" || ""
    return jwt.sign(payload, secretKey)
}

export function verify_token(token: string) {

    let secretKey: jwt.Secret = "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67" || ""
    let token1: string = token
    return jwt.verify(token1, secretKey)
}