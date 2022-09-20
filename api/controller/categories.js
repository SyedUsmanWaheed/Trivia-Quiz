import joi from "joi"
import Model from "../models/index.js"
import CRUDService from "../services/CRUD.js"


export const addCategory = async function (req, res, next) {

    let validation_schema = joi.object().keys({
        name: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, message: error.message })
    }
    try {
        let { name } = req.body
        let category_found = await CRUDService.getOne(Model.Category, { name })

        if (category_found) {

            return res.json({ error: true, info: "category already exists" })
        }
        let category_added = await addCategory1(name)
        return res.json({ error: false, message: "category added" })
    }
    catch (err) {
        console.log(err)
        return res.json({ error: true, message: err })
    }

}

export const get_list = async function (req, res, next) {
    try {
        let list = await CRUDService.getList(Model.Category, {})
        if (list.length == 0) {
            return res.json({ error: true, message: "list empty" })
        }
        return res.json({ error: false, data: list })
    }
    catch (err) {
        console.log(err)
    }
}

export const search_category = async function (req, res, next) {
    let validation_schema = joi.object().keys({
        search: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, message: error.message })
    }
    try {
        let { search } = req.body
        let searched = await CRUDService.getList(Model.Category, { name: { $regex: ".*" + search + ".*", $options: "i" } })
        if (searched.length == 0) {
            return res.json({ error: true, message: "nothing found" })
        }
        return res.json({ error: false, message: "Search Result", data: searched })
    }
    catch (err) {
        console.log(err)
    }
}