import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { poster_router, attendee_router } from "./routes/user.js";
import dotenv from "dotenv"
import category from "./routes/categories.js";
import quiz from "./routes/quiz.js"
import { isUserAuthorized } from "./middleware/authorization.js";
import report from "./routes/report.js";

dotenv.config()
mongoose.connect(process.env.APPMONGOURL);

const app = express()
app.use(bodyParser.json())


app.use("/poster", poster_router)
app.use("/attendee", attendee_router)
app.use("/categories", isUserAuthorized, category)
app.use("/quiz", isUserAuthorized, quiz)
app.use("/report",isUserAuthorized, report)

app.listen(3000, () => {
   console.log("server good");

})
