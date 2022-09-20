import { Router } from "express";
import { add_quiz, attend_quiz, check_quiz } from "../controller/quiz.js";

const quiz= Router()

quiz.post("/add", add_quiz)
quiz.post("/attend",attend_quiz)
quiz.post("/check", check_quiz)

export default quiz;