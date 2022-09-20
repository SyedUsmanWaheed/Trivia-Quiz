import joi from "joi";

import { decrypt, encrypt } from "../helper/encryption.js";
import { addUser, searchUserByEmail } from "../services/user.js";
import { sign_token, verify_token } from "../helpers/jwt.js";
import CRUD from "../services/CRUD.js";
import { User } from "../models/user.js";



export const registerPoster = async function (req, res, next) {

    let validation_schema = joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().valid("Poster").required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, message: error.message })
    }

    try {
        let poster = await searchUserByEmail(req.body.email)
        if (poster) {
            return res.json({ error: true, message: "user already exists" })
        }
        let poster_added = await addUser({
            email: req.body.email,
            name: req.body.name,
            password: encrypt(req.body.password),
            type: req.body.type
        })
        return res.json({ error: false, message: "Poster registered" })
    }
    catch (err) {
        console.log(err)
        return res.json({ error: true, message: "error here" })
    }
}

export const registerAttendee = async function (req, res, next) {

    let validation_schema = joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().valid("Attendee").required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, message: error.message })
    }

    try {
        let attendee = await searchUserByEmail(req.body.email)
        if (attendee) {
            return res.json({ error: true, message: "user already exists" })
        }
        let attendee_added = await addUser({
            email: req.body.email,
            name: req.body.name,
            password: encrypt(req.body.password),
            type: req.body.type
        })
        return res.json({ error: false, message: "Attendee registered" })
    }
    catch (err) {
        console.log(err)
        return res.json({ error: true, message: "error here" })
    }
}

export const posterLogin = async function (req, res, next) {
    let validation_schema = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        console.log("1122")
        return res.json({ error: true, message: error.message })
    }

    try {
        let user = await searchUserByEmail(req.body.email)
        if (!user) {
            return res.json({ error: true, message: "user does not exist" })
        }
        if (decrypt(user.password) != req.body.password) {
            return res.json({ error: true, message: "invalid password" })
        }
        if (user.type != "Poster") {
            return res.json({ error: true, message: "you are not a poster" })
        }
        let jwt_token = sign_token({
            user_id: user._id,
            timestamp: Date.now()
        })

        let updated = await CRUD.oneUpdate(User, { _id: user._id }, { token: jwt_token })

        return res.json({ error: false, info: "Successfully Logged in", token: jwt_token })
    }
    catch (err) {
        console.log(err)
    }
}

export const attendeeLogin = async function (req, res, next) {
    let validation_schema = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        console.log("1122")
        return res.json({ error: true, message: error.message })
    }

    try {
        let user = await searchUserByEmail(req.body.email)
        if (!user) {
            return res.json({ error: true, message: "user does not exist" })
        }
        if (decrypt(user.password) != req.body.password) {
            return res.json({ error: true, message: "invalid password" })
        }
        if (user.type != "Attendee") {
            return res.json({ error: true, message: "you are not a attendee" })
        }
        let jwt_token = sign_token({
            user_id: user._id,
            timestamp: Date.now()
        })
        let updated = await CRUD.oneUpdate(User, { _id: user._id }, { token: jwt_token })
        return res.json({ error: false, info: "Successfully Logged in", token: jwt_token })
    }
    catch (err) {
        console.log(err)
    }
}

