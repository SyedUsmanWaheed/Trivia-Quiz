import { verify_token } from "../helpers/jwt.js"
import CRUD from "../services/CRUD.js"
import SessionModel from "../models/sessions.js"
import { FilterQuery } from "mongoose"
import { SessionsInterface } from "../intefaces/sessions.js"
import { Socket } from "socket.io"
import { DataResponse } from "../intefaces/interface.js"

export async function SocketAuth(socket: Socket, next: () => void) {

    let token = socket.handshake.query && socket.handshake.query.token ? socket.handshake.query.token : null

    try {
        socket.user = verify_token(token)
        next()
    } catch (err) {
        console.log(err)
        let response : DataResponse ={ error: true, info: "Token has expired" }
        return socket.emit('failure', response)
    }
}