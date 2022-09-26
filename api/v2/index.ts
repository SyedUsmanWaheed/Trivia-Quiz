import "./config/database.js"
// import * as express from 'express';

import express, { Application } from "express";

import bodyParser from "body-parser"

import { attendee_router, poster_router } from "./routes/user.js"
import category from "./routes/category.js";
import quiz from "./routes/quiz.js";
import { User } from "./intefaces/models.js";
import { JwtPayload } from "jsonwebtoken";

const app: Application = express()

const port: Number = 3000
declare global {
    namespace Express {
      interface Request {
        user: string | JwtPayload | object
      }
    }
  }

app.use(bodyParser.json())
// console.log(process.env)

app.use("/attendee", attendee_router)
app.use("/poster", poster_router)
app.use("/categories", category)
app.use("/quiz", quiz)
// app.use("/report", isUserAuthorized, report)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})