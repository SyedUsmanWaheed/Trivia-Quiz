import joi from "joi";
import Model from "../models/index.js";
import CRUDService from "../services/CRUD.js";

export const generate_report = async (req, res) => {
    try {
        let user = await CRUDService.getList(Model.Report, { user_id: req.user.user_id }, { user_id: 0, _id: 0, __v: 0 })
        if (!user) {
            return res.json({ error: true, message: "user does not exist" })
        }
        return res.json({ error: false, info: "here are all quizzes attempted by you", data: user })

    } catch (err) {
        console.log(err)
    }
}