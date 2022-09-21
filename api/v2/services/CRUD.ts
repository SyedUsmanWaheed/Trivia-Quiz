import { FilterQuery, HydratedDocument, Model, Document, LeanDocument, Require_id, LeanDocumentOrArray } from "mongoose"

class CRUD {
    static async getList<ModelInterface>(model: Model<ModelInterface>, filter: FilterQuery<ModelInterface>): Promise<LeanDocument<HydratedDocument<ModelInterface>>[] | LeanDocument<Require_id<ModelInterface>>[]> {
        return await model.find(filter).lean().exec()
    }

    static async getOne<ModelInterface>(model: Model<ModelInterface>, filter: FilterQuery<ModelInterface>): Promise<ModelInterface | null> {//Promise<LeanDocumentOrArray<HydratedDocument<ModelInterface> | null>> {
        return await model.findOne(filter)
    }

    static async add<ModelInterface, DataInterface>(model: Model<ModelInterface>, data: DataInterface): Promise<ModelInterface | Document<unknown, any, ModelInterface>> {
        let new_object: HydratedDocument<ModelInterface, {}, unknown> = new model(data)
        return await new_object.save()
    }
    // static async oneUpdate(model, filter, data) {
    //     return await model.updateOne(filter, { $set: data })
    // }
    // static async push(model, query, data) {
    //     return await model.updateOne(query, { $push: data })
    // }

}

export default CRUD
