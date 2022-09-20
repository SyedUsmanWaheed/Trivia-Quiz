import { verify_token } from "../helpers/jwt.js"

export const isUserAuthorized = (req, res, next) => {
    let authroization_token_string = req.headers.authorization 
    //"Bearer {token}"
    let token = authroization_token_string.split(" ")[1]

    try{
        req.user = verify_token(token)
        next()
    } catch(err) {
        return res.status(401).json({ error: true, info: "Invalid Token"})
    }
}