import joi, { Schema } from "joi"
import { DataResponse } from "../intefaces/interface.js"
import { NextFunction, Request, Response } from "express"
import { FilterQuery } from "mongoose"
import { User, UserInterface } from "../intefaces/models.js"

import CRUD from "../services/CRUD.js"
import UserModel from "../models/user.js"

export const registerPoster = async function (req: Request, res: Response, next: NextFunction) {

    let validation_schema: Schema<UserInterface> = joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().valid("Poster").required()
    })

    let { error, value } = validation_schema.validate(req.body, { allowUnknown: false })
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }

    try {

        let body: User = req.body

        let query: FilterQuery<User> = { email: body.email }

        let poster = await CRUD.getOne(UserModel, query)

        if (poster) {
            let response: DataResponse = { error: true, info: "user already exists" }
            return res.json(response)
        }

        let db_response = await CRUD.add(UserModel, body)

        let response: DataResponse = { error: true, info: "Poster registered", data: db_response }
        return res.json(response)

    } catch (err) {
        console.log(err)
        return res.json({ error: true, message: "Poster register failed" })
    }
}