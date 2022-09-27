import { NextFunction, Response, Request } from "express";
import { verify_token } from "../helpers/jwt.js";

export const isUserAuthorized =  (req: Request, res: Response, next: NextFunction) => {
    let authorization_token: string = req.headers.authorization || ""

    let token = authorization_token.split(" ")[1]

    try{
        req.user = verify_token(token) 
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({ error: true, info: "Invalid Token"})
    }

}