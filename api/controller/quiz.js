import joi from "joi";
import mongoose, { isValidObjectId } from "mongoose";
import CRUDService from "../services/CRUD.js";
import Model from "../models/index.js"

export const add_quiz = async function (req, res, next) {
    let validation_schema = joi.object({
        poster_id: joi.string().required(),
        category_id: joi.string().required(),
        attendee_id: joi.string().required(),
        questions: joi.array().items(joi.object({
            question: joi.string().required(),
            options: joi.object().keys({
                op1: joi.string().required(),
                op2: joi.string().required(),
                op3: joi.string().required(),
                op4: joi.string().required()
            }).required(),
            answer: joi.string().required()
        })).required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, message: error.message })
    }
    try {
        let valid_poster = await CRUDService.getOne(Model.User, { _id: req.body.poster_id })

        if (valid_poster == null) {
            return res.json({ error: true, message: "This Poster Does not exist" })
        }

        let valid_category = await CRUDService.getOne(Model.Category, { _id: req.body.category_id })

        if (valid_category == null) {
            return res.json({ error: true, message: "This Category Does not exist" })
        }

        let valid_attendee = await CRUDService.getOne(Model.User, { _id: req.body.attendee_id })


        if (valid_attendee == null) {
            return res.json({ error: true, message: "This Category Does not exist" })
        }

        let new_quiz = await CRUDService.add(Model.Quiz, {
            poster_id: req.body.poster_id,
            category_id: req.body.category_id,
            attendees: [req.body.attendee_id],
            questions: req.body.questions
        })
        return res.json({ error: false, message: "new quiz added", data: new_quiz })
    }
    catch (err) {
        console.log(err)
    }
}

export const attend_quiz = async (req, res, next) => {
    let validation_schema = joi.object().keys({
        quiz_id: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, info: error.message })
    }
    try {
        let quiz1 = await CRUDService.getOne(Model.Quiz, { _id: req.body.quiz_id })

        if (quiz1 == null) {
            return res.json({ error: true, info: " This Quiz Does not exist" })
        }

        let quiz = await CRUDService.push(Model.Quiz, { _id: req.body.quiz_id }, { attendees: req.user.user_id })

        if (quiz.modifiedCount != 1) {
            return res.json({ error: true, info: "could not push" })
        }
        return res.json({ error: false, info: "Attendee Successfully added" })

    } catch (err) {
        console.log(err)
    }

}
export const check_quiz = async function (req, res, next) {
    let validation_schema = joi.object().keys({
        quiz_id: joi.string().required(),
        answers: joi.array().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        return res.json({ error: true, info: error.message })
    }
    try {

        if(! isValidObjectId(req.body.quiz_id))  {
            return res.json({error: true, info: "id not valid"})
        }

        let quiz = await CRUDService.getOne(Model.Quiz, { _id: req.body.quiz_id })

        if (quiz == null) {
            return res.json({ error: true, info: " This Quiz Does not exist" })
        }
        let correct = 0
        let incorrect = 0
        quiz.questions.forEach((question, index) => {
            // console.log(question)
            if (quiz.questions[index].answer == req.body.answers[index]){
                correct +=1
            } else{
                incorrect+=1
            }
        })
        let percentage = (correct/(correct+incorrect))*100
        let report = await CRUDService.add(Model.Report, {
            quiz_id : req.body.quiz_id,
            user_id : req.user.user_id,
            stats: {
                correct,
                incorrect,
                percentage
            }           
        })
        report.save();
        return res.json({ error: false, info: "quiz checked", data: {correct, incorrect, percentage} })
    } catch (err) {
        console.log(err)
    }
}