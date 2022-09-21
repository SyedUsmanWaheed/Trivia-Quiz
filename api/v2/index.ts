import "./config/database.js"

import express, { Application } from "express";

import bodyParser from "body-parser"

import { poster_router } from "./routes/user.js"

const app: Application = express()

const port: Number = 3000

app.use(bodyParser.json())

app.use("/poster", poster_router)
// app.use("/attendee")
// app.use("/categories", isUserAuthorized, category)
// app.use("/quiz", isUserAuthorized, quiz)
// app.use("/report", isUserAuthorized, report)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})