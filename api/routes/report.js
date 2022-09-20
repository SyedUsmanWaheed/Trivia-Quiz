import { Router } from "express";
import { generate_report } from "../controller/report.js";

let report = Router()
report.get("/", generate_report)
export default report