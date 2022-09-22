import joi, { Schema } from "joi"
import { DataResponse } from "../intefaces/interface.js"
import { NextFunction, query, Request, response, Response } from "express"
import CRUD from "../services/CRUD.js"
import { Category, CategoryInterface } from "../intefaces/category.js"
import { FilterQuery } from "mongoose"
import { CategoryModel } from "../models/category.js"

export const addCategory = async function (req: Request, res: Response, next: NextFunction) {

    let validation_schema :Schema <Category> = joi.object().keys({
        name: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        let response: DataResponse = { error: true, info: error.message }
        return res.json(response)
    }
    try {
        let { name } = req.body
        let filter: FilterQuery<Category> = {name}
        let category_found = await CRUD.getOne(CategoryModel, filter)

        if (category_found) {
            let response: DataResponse = { error: true, info: "Category Already Exists" }
            return res.json(response)
        }
        let data: any = {name}
        let category_added = await CRUD.add(CategoryModel, data)
        let response: DataResponse = { error: true, info: "Category Added" }
            return res.json(response)
    }
    catch (err) {
        console.log(err)
        return res.json({ error: true, message: err })
    }

}