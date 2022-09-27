import mongoose, { Schema } from "mongoose";
import {CategoryInterface} from"../intefaces/category.js"

let category_schema = new Schema<CategoryInterface>({
    name: {type: String, required: true}
})

export const CategoryModel = mongoose.model("category", category_schema)