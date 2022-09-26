import { NextFunction, Request, Response } from "express";
import joi, {Schema} from "joi";
import mongoose, { FilterQuery, isValidObjectId, UpdateQuery } from "mongoose";
import { Quiz, QuizInterface} from "../intefaces/quiz.js";
import{ Report, ReportInterface } from "../intefaces/report.js"
import ReportModel from "../models/report.js"
import CRUD from "../services/CRUD.js";
import QuizModel from "../models/quiz.js"
import { DataResponse } from "../intefaces/interface.js"
import { CategoryModel } from "../models/category.js";
import UserModel from "../models/user.js"

export const add_quiz = async function (req: Request, res: Response, next: NextFunction) {

    let validation_schema: Schema<Quiz> = joi.object().keys({
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
        let response :DataResponse = { error: true, info: error.message }
        return res.json(response)
    }
    try {
        let poster_filter: FilterQuery<Quiz> = { _id: req.body.poster_id }
        let valid_poster = await CRUD.getOne(UserModel, poster_filter)

        if (valid_poster == null) {
            let response :DataResponse = { error: true, info:"This Poster Does not exist"  }
            return res.json(response)
        }
        let category_filter: FilterQuery<Quiz> = { _id: req.body.category_id }
        let valid_category = await CRUD.getOne(CategoryModel, category_filter)

        if (valid_category == null) {
            let response :DataResponse = { error: true, info:"This Category Does not exist"  }
            return res.json(response)
        }

        let attendee_filter: FilterQuery<Quiz> = { _id: req.body.attendee_id }
        let valid_attendee = await CRUD.getOne(UserModel, attendee_filter)
        
        if (valid_attendee == null) {
            let response :DataResponse = { error: true, info:"This Attendee Does not exist"  }
            return res.json(response)
        }

        let new_quiz = await CRUD.add(QuizModel, {
            poster_id: req.body.poster_id,
            category_id: req.body.category_id,
            attendees: [req.body.attendee_id],
            questions: req.body.questions
        })
        let response :DataResponse ={ error: false, info: "new quiz added", data: new_quiz }
        return res.json(response)
    }
    catch (err) { 
        console.log(err)
    }
}

export const attend_quiz = async (req: Request, res: Response, next: NextFunction) => {
    let validation_schema: Schema<Quiz> = joi.object().keys({
        quiz_id: joi.string().required()
    })
    let { error, value } = validation_schema.validate(req.body)
    if (error) {
        let response: DataResponse ={ error: true, info: error.message }
        return res.json(response)
    }
    try {
        let filter : FilterQuery<Quiz> = { _id: req.body.quiz_id }
        let quiz1 = await CRUD.getOne(QuizModel, filter)

        if (quiz1 == null) {
            let response: DataResponse ={ error: true, info: " This Quiz Does not exist" }
            return res.json(response)
        }

        let query: FilterQuery<Quiz> ={ _id: req.body.quiz_id }
        let data: UpdateQuery<Quiz> = { attendees: req.user.user_id }
        let quiz = await CRUD.push(QuizModel, query , data)

        if (quiz.modifiedCount != 1) {
            let response: DataResponse ={ error: true, info: "could not push"  }
            return res.json(response)
        }
        let response: DataResponse ={ error: true, info: "Attendee Successfully added"  }
        return res.json(response)
    } catch (err) {
        console.log(err)
    }
}

export const check_quiz = async function (req: Request, res: Response, next:NextFunction) {
    let validation_schema :Schema<Quiz>= joi.object().keys({
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
        let filter : FilterQuery<Quiz> = { _id: req.body.quiz_id }
        let quiz = await CRUD.getOne(QuizModel, filter) 

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
        let data = {
            quiz_id : req.body.quiz_id,
            user_id : req.user.user_id,
            stats: {
                correct,
                incorrect,
                percentage
            }           
        }
        let report = await CRUD.add(ReportModel, data)
        report.save();
        let response: DataResponse ={ error: false, info: "quiz checked", data: {correct, incorrect, percentage} }
        return res.json(response)
    } catch (err) {
        console.log(err)
    }
}