import { Jwt } from "jsonwebtoken";
import { Sessions, SessionsInterface } from "../intefaces/sessions.js";
import Session from "../models/sessions.js";

export function addSession(session_data: SessionsInterface){
    return new Promise(async (resolve, reject)=>{
        try{
            let session = new Session(Object.assign(session_data, { created_at: Date.now() }))
            await session.save()
            resolve ("Session added")
        }
        catch(err){
            console.log(err)
            reject("error: could not add")
        }
        
    })
}

export function getSession(user_id: Sessions, device_id = { $ne: null }) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.findOne({ user_id: user_id, device_id: device_id })
            resolve(session)
        } catch (err) {
            console.log(err)
            reject("Error retreiving sessions")
        }

    })
}
export function token_exists(token: Jwt) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.findOne({ token: token })
            resolve(session)
        } catch (err) {
            console.log(err)
            reject("Error retreiving sessions")
        }

    })
}

export function removeAllSessions(user_id: Sessions) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.deleteMany({ user_id: user_id })
            resolve(session)
        } catch (err) {
            console.log(err)
            reject("Error removing sessions")
        }

    })
}

export function removeSession(user_id: Sessions, device_id: any) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.deleteOne({ user_id, device_id })
            resolve(session)
        } catch (err) {
            console.log(err)
            reject("Error removing sessions")
        }

    })
}