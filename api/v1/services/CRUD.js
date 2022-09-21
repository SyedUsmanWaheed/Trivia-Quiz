import { model } from "mongoose"

class CRUD {
    static async getList(model, filter, projection) {
        return await model.find(filter, projection).lean().exec()
    }

    static async getOne(model, filter, projection) {
        return await model.findOne(filter, projection).lean().exec()
    }
    static async add(model, data) {
        let new_object = new model(data)
        return (
            await new_object.save()
        )
    }
    static async oneUpdate(model, filter, data) {
        return await model.updateOne(filter, { $set: data })
    }
    static async push(model, query, data) {
        return await model.updateOne(query, { $push: data })
    }

}

export default CRUD
