import { Categories } from "../models/category.js";

export function addCategory1(name){
    return new Promise(async (resolve, reject)=>{
        try{
            let new_category = new Categories({name});
            await new_category.save();
            resolve("category Added") 
        }
        catch(err){
            console.log((err))
            reject("could not add")
        }
      
    })
}

export function searchCategory(name){
    return new Promise(async (resolve,reject)=>{
        try{
            let category = await Categories.findOne({name: name})
            resolve(category)
        }
        catch(err){
            console.log(err)
            reject("could not find")
        }
    })
}