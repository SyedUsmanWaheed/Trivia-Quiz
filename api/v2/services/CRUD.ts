import { FilterQuery, HydratedDocument, Model, Document, LeanDocument, Require_id, LeanDocumentOrArray, ProjectionType, UpdateQuery } from "mongoose"

class CRUD {
    static async getList<ModelInterface>(model: Model<ModelInterface>, filter: FilterQuery<ModelInterface>, projection?: ProjectionType<ModelInterface>, limit?: number, offset?: number): Promise<LeanDocument<HydratedDocument<ModelInterface>>[] | LeanDocument<Require_id<ModelInterface>>[]> {

        return await model.find(filter, projection)
            .skip(offset || 0)
            .limit(limit || 20)
            .lean().exec()
    }

    static async getOne<ModelInterface>(model: Model<ModelInterface>, filter: FilterQuery<ModelInterface>, projection?: ProjectionType<ModelInterface>): Promise<ModelInterface | null> {
        return await model.findOne(filter, projection)
    }

    static async add<ModelInterface, DataInterface>(model: Model<ModelInterface>, data: DataInterface): Promise<ModelInterface | Document<unknown, any, ModelInterface>> {
        let new_object: HydratedDocument<ModelInterface, {}, unknown> = new model(data)
        return await new_object.save()
    }


    static async oneUpdate<ModelInterface, DataInterface>(model: Model<ModelInterface>, filter: FilterQuery<ModelInterface>, data: UpdateQuery<DataInterface>) {
        return await model.updateOne(filter, { $set: data })
    }


    static async push<ModelInterface, DataInterface>(model: Model<ModelInterface>, query: FilterQuery<ModelInterface>, data: UpdateQuery<DataInterface>) {
        return await model.updateOne(query, { $push: data })
    }

}

export default CRUD
