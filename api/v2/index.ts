import "./config/database.js"
// import * as express from 'express';
import express, { Application } from "express";
import bodyParser from "body-parser"
import { attendee_router, poster_router, user_router } from "./routes/user.js"
import category from "./routes/category.js";
import quiz from "./routes/quiz.js";
import { JwtPayload } from "jsonwebtoken";
import { FilterQuery, LeanDocument, Types, UpdateQuery } from "mongoose";
import http from "http";
import CRUD from "./services/CRUD.js";
import UserModel from "../v2/models/user.js"
import { User, UserInterface } from "./intefaces/models.js";
import ChatModel from "../v2/models/user.js"

const app: Application = express()

const port: Number = 3000
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            APPCRYPTOVERIFICATIONENCRYPTIONKEY: string
            APPCRYPTOVERIFICATIONENCRYPTIONVECTOR: string
            APPMONGOURL: string
            APPJWTKEY: string
        }
    }

}

declare module "jsonwebtoken" {
    export interface JwtPayload {
        user_id: Types.ObjectId,
        timestamp: number
    }
}

// declare module "socket.io" {
//     class Socket {
//         user: JwtPayload
//     }
// }



app.use(bodyParser.json())
// console.log(process.env)

app.use("/attendee", attendee_router)
app.use("/poster", poster_router)
app.use("/categories", category)
app.use("/quiz", quiz)
// app.use("/report", isUserAuthorized, report)
app.use("/user", user_router)

// const server: http.Server = http.createServer(app)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

// let io: socketio.Server = new socketio.Server(server)

// io.use((socket: socketio.Socket, next: () => void) => {

// })
    // .on("connection", async (socket: socketio.Socket) => {
    //     console.log("Socket: ", socket.id)
    //     console.log("User: ", socket.user)

    //     let filter: FilterQuery<User> = { _id: socket.user.user_id }
    //     let data: UpdateQuery<User> = { web_socket: socket.id }

    //     await CRUD.updateOne(UserModel, filter, data)
    //     // updateProfile(socket.user.user_id, { websocket: socket.id })

    //     socket.on('message', async (data) => {
    //         //data = JSON.parse(data);
    //         console.log("Message Recieved: ", data)
    //         let { to, content, type, file_name } = data

    //         try {
    //             let filter: FilterQuery<User> = { _id: to }
    //             let receiver: LeanDocument<User> | null = await CRUD.getOne(UserModel, filter)

    //             if (!receiver) {
    //                 console.log("User does not exist")
    //                 return socket.emit('message_failure', { info: "User Does not exist" })
    //             }

    //             let chat = {
    //                 from: socket.user.user_id,
    //                 to,
    //                 content,
    //                 status: "sent"
    //             }
    //             await CRUD.add(ChatModel, chat)
    //             io.to(receiver.web_socket).emit('message', { from: socket.user.user_id, content })
    //             console.log("chat Sent")

    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })

    // })