import { NextFunction, Request, Response } from "express";
import CRUD from "../services/CRUD";
import NotificationModel from "../models/notification.js"
import { FilterQuery } from "mongoose";
import { Notification } from "../intefaces/notification";
import { DataResponse } from "../intefaces/interface";
import Joi, { Schema } from "joi";


export const notification_list = async (req: Request, res: Response, next: NextFunction) => {
    let validation_schema: Schema<any> = Joi.object().keys({
        offset: Joi.number().optional(),
        limit: Joi.number().optional()
    })
    let { error, value } = validation_schema.validate(req.body)

    if (error) {
        return res.json({ error: true, info: error.message })
    }
    try {
        let{ offset, limit } = req.body
        offset = offset || 0
        limit = limit || 20

        let filter: FilterQuery<Notification> = { user_id: req.user.user_id }

        let list = await CRUD.getList(NotificationModel, filter,{} ,{} , limit, offset)

        if (!list) {
            return res.json({ error: true, info: "no notification" })
        }
        let response: DataResponse = { error: false, info: "Notification list", data: list }

    } catch (err) {

        console.log(err)
    }


}