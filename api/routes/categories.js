import { Router } from "express";
import { addCategory, get_list, search_category } from "../controller/categories.js";

const category = Router();

category.post("/add", addCategory)
category.get("/list", get_list)
category.post("/search", search_category
)
export default category;