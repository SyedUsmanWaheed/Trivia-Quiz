import joi from "joi"
import { Request, Response } from "express"
import CRUD from "../services/CRUD.js"
import ReportModel from "../models/report.js"
import { FilterQuery, ProjectionType } from "mongoose"
import { Report } from "../intefaces/report.js"

export const generate_report = async (req: Request, res:Response) => {
    try {
        let filter : FilterQuery<Report> = { user_id: req.user.user_id }
        let projection : ProjectionType<Report> = { user_id: 0, _id: 0, __v: 0 }
        let user = await CRUD.getList(ReportModel, filter, projection)
        if (!user) {
            return res.json({ error: true, message: "user does not exist" })
        }
        return res.json({ error: false, info: "here are all quizzes attempted by you", data: user })

    } catch (err) {
        console.log(err)
    }
}