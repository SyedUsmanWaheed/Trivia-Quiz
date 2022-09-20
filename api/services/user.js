import { User } from "../models/user.js";

export function addUser(user_data){
    return new Promise(async(resolve, reject) => {
        try{
            let poster = new User(user_data);
            await poster.save();
            resolve("user added successfully")
        }
        catch(err){
            reject("user not registered")
        }
    })
}

export function searchUserByEmail(user_email){
    return new Promise(async(resolve, reject)=>{
        try{
           let user = await User.findOne({email:user_email})
            resolve(user)
        }
        catch(err){
            reject("error retrieveing user")
        }
    })
}