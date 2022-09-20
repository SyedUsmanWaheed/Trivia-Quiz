import session from "../models/session.js";

export function addSession(session_data){
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

export function getSession(user_id, device_id = { $ne: null }) {
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
export function token_exists(token) {
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

export function removeAllSessions(user_id) {
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

export function removeSession(user_id, device_id) {
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