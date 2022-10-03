import joi, { Schema } from "joi"
import { DataResponse } from "../intefaces/interface.js"
import { NextFunction, query, Request, response, Response } from "express"
import { FilterQuery, UpdateQuery } from "mongoose"
import { User, UserInterface } from "../intefaces/models.js"

import CRUD from "../services/CRUD.js"
import UserModel from "../models/user.js"
import { encrypt, decrypt } from "../helpers/encryption.js"
import { sign_token } from "../helpers/jwt.js"
import user from "../models/user.js"

export const registerPoster = async function (req: Request, res: Response, next: NextFunction) {

    let validation_schema: Schema<User> = joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().valid("Poster").required(),
        location: joi.object().keys({
            longitude: joi.number().min(-180).max(180).required(),
            latitude: joi.number().min(-90).max(90).required()

        })

    })

    let { error, value } = validation_schema.validate(req.body, { allowUnknown: false })
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }

    try {

        let query: FilterQuery<User> = { email: req.body.email }

        let poster = await CRUD.getOne(UserModel, query)

        if (poster) {
            let response: DataResponse = { error: true, info: "user already exists" }
            return res.json(response)
        }

        let db_response = await CRUD.add(UserModel, {
            email: req.body.email,
            name: req.body.name,
            // issue of type in decrypt and has to remove it
            password: req.body.password,
            type: req.body.type,
            location: {
                type: "Point",
                coordinates: [req.body.location.longitude, req.body.location.latitude]
            }
        })

        let response: DataResponse = { error: true, info: "Poster registered", data: db_response }
        return res.json(response)

    } catch (err) {
        console.log(err)
        return res.json({ error: true, message: "Poster register failed" })
    }
}

export const registerAttendee = async function (req: Request, res: Response, next: NextFunction) {

    let validation_schema: Schema<User> = joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().valid("Attendee").required(),
        location: joi.object().keys({
            longitude: joi.number().min(-180).max(180).required(),
            latitude: joi.number().min(-90).max(90).required()

        })
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }

    try {
        let query: FilterQuery<User> = { email: req.body.email }

        let attendee = await CRUD.getOne(UserModel, query)

        if (attendee) {
            let response: DataResponse = { error: true, info: "user already exists" }
            return res.json(response)
        }

        let attendee_added = await CRUD.add(UserModel, {
            email: req.body.email,
            name: req.body.name,
            // issue of type in decrypt and has to remove it
            password: req.body.password,
            type: req.body.type,
            location: {
                type: "Point",
                coordinates: [req.body.location.longitude, req.body.location.latitude]
            }
        })

        return res.json({ error: false, message: "Attendee registered" })
    }
    catch (err) {
        console.log(err)
        return res.json({ error: true, message: err })
    }
}

export const posterLogin = async function (req: Request, res: Response, next: NextFunction) {
    let validation_schema: Schema<User> = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }

    try {
        let query: FilterQuery<User> = { email: req.body.email }
        let user = await CRUD.getOne(UserModel, query)
        if (!user) {
            let response: DataResponse = { error: true, info: "user does not exist" }
            return res.json(response)
        }
        // had to remove decrypt
        if (user.password != decrypt(req.body.password)) {
            let response: DataResponse = { error: true, info: "invalid password" }
            return res.json(response)
        }
        if (user.type != "Poster") {
            let response: DataResponse = { error: true, info: "you are not a poster" }
            return res.json(response)
        }
        // issue of datatype with sign_token and has to make the datatype of its parameter as "any"
        let jwt_token = sign_token({
            user_id: user._id,
            timestamp: Date.now()
        })
        let filter: FilterQuery<User> = { _id: user._id }
        let data: UpdateQuery<User> = { token: jwt_token }
        let updated = await CRUD.updateOne(UserModel, filter, data)

        let response: DataResponse = { error: false, info: "Successfully Logged in", data: data }
        return res.json(response)
    }
    catch (err) {
        console.log(err)
    }
}

export const attendeeLogin = async function (req: Request, res: Response, next: NextFunction) {
    let validation_schema: Schema<User> = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }

    try {
        let query: FilterQuery<User> = { email: req.body.email }
        let user = await CRUD.getOne(UserModel, query)
        if (!user) {
            let response: DataResponse = { error: true, info: "user does not exist" }
            return res.json(response)
        }
        //user.password has a type of "String" which is not changing but decrypt takes a parameter of type "string" which is also not changing
        // so removing decrypt for the time being
        if (user.password != req.body.password) {
            let response: DataResponse = { error: true, info: "invalid password" }
            return res.json(response)
        }
        if (user.type != "Attendee") {
            let response: DataResponse = { error: true, info: "you are not a attendee" }
            return res.json(response)
        }
        let jwt_token = sign_token({
            user_id: user._id,
            timestamp: Date.now()
        })
        let filter: FilterQuery<User> = { _id: user._id }
        let data: UpdateQuery<User> = { token: jwt_token }
        let updated = await CRUD.updateOne(UserModel, filter, data)
        let response: DataResponse = { error: false, info: "Successfully Logged in", data: data }
        return res.json(response)
    }
    catch (err) {
        console.log(err)
    }
}

export const update_location = async (req: Request, res: Response, next: NextFunction) => {
    let validation_schema = joi.object().keys({
        user_id: joi.string().required(),
        longitude: joi.number().min(-180).max(180).required(),
        latitude: joi.number().min(-90).max(90).required()

    })
    let { error, value } = validation_schema.validate(req.body)

    if (error) {
        res.json({ error: true, info: error.message })
    }
    try {
        let filter: FilterQuery<User> = { _id: req.body.user_id }

        let data: UpdateQuery<User> = {
            location: {
                type: "Point",
                coordinates: [req.body.longitude, req.body.latitude]
            }
        }

        let updated_location = await CRUD.updateOne(UserModel, filter, data)

        let response: DataResponse = { error: false, info: "Successfully Updated", data: updated_location }
        return res.json(response)
    } catch (err) {
        console.log(err)
    }
}

export const find_nearby = async (req: Request, res: Response, next: NextFunction) => {
    let validation_schema = joi.object().keys({
        user_id: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        res.json({ error: true, info: error.message })
    }
    try {
        let filter: FilterQuery<User> = { _id: req.body.user_id }
        let user = await CRUD.getOne(UserModel, filter)
        if (!user) {
            return res.json({ error: true, info: "user not found" })
        }
        console.log(user.location?.coordinates)
        let nearby = await CRUD.getList(UserModel, {
            location: {
                $geoWithin: {
                    $centerSphere: [user.location?.coordinates, 100 / 3963.2]
                }
            }

        }
        )
        let response: DataResponse = { error: false, info: "Successfully found", data: nearby }
        return res.json(response)

    } catch (err) {
        console.log(err)
    }

}

export const find_nearby_sorted = async (req: Request, res: Response, next: NextFunction) => {
    let validation_schema = joi.object().keys({
        user_id: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        res.json({ error: true, info: error.message })
    }
    try {
        let filter: FilterQuery<User> = { _id: req.body.user_id }
        let user = await CRUD.getOne(UserModel, filter)
        if (!user) {
            return res.json({ error: true, info: "user not found" })
        }
        console.log(user.location?.coordinates)
        let nearby = await CRUD.getList(UserModel, {
            location: {
                $nearSphere: {
                    $geometry: user.location,
                    $maxDistance: 500 *1609.34
                }
            }
        })
        let response: DataResponse = { error: false, info: "Successfully found", data: nearby }
        return res.json(response)

    } catch (err) {
        console.log(err)
    }

}

export const polygon_searching = async (req: Request, res: Response, next: NextFunction) => {

    let Pakistan = [
                [35.136518, 71.921112],
                [31.495215, 74.529452],
                [24.704860, 68.607660],
                [30.277011, 66.772405],
                [35.136518, 71.921112]
                   ]

    let filter: FilterQuery<User> = {
        location: {
            $geoWithin : {
                $geometry: {
                    type: "Polygon",
                    coordinates: [Pakistan]
                }
            }
        }

    }
    let users_in_pak = await CRUD.getList(UserModel, filter)

    if(!users_in_pak){
        return res.json ({error: true, info: "no user found"})
    }
    return res.json ({error: true, info: "users found are", data: users_in_pak})



}



