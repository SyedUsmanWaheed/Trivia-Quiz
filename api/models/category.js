import mongoose, { Schema } from "mongoose";

let categories_schema = new Schema({

    name: { type: String, required: true }

})

export const Category =  mongoose.model("categories", categories_schema)