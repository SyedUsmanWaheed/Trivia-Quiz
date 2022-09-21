import {
    FilterQuery,
    HydratedDocument,
    Model,
    Document,
    LeanDocument,
    Require_id,
    LeanDocumentOrArray,
    ProjectionType,
    UpdateQuery,
    UnpackedIntersection,
    PopulateOptions,
    LeanDocumentOrArrayWithRawType,
    UpdateWriteOpResult
} from "mongoose"

class CRUD {

    static async getList<ModelInterface>(
        model: Model<ModelInterface>,
        filter: FilterQuery<ModelInterface>,
        projection?: ProjectionType<ModelInterface>,
        populateArray?: Array<string | PopulateOptions>,
        limit?: number,
        offset?: number
    ): Promise<LeanDocument<Omit<HydratedDocument<ModelInterface, {}, {}>, never>>[]
        | LeanDocument<Require_id<UnpackedIntersection<ModelInterface, {}>>>[]> {

        return await model.find(filter, projection)
            .skip(offset || 0)
            .limit(limit || 20)
            .populate(populateArray || [])
            .lean().exec()
    }

    static async getOne<ModelInterface>(
        model: Model<ModelInterface>,
        filter: FilterQuery<ModelInterface>,
        projection?: ProjectionType<ModelInterface>,
        populateArray?: Array<string | PopulateOptions>,
    ): Promise<LeanDocumentOrArray<UnpackedIntersection<HydratedDocument<ModelInterface, {}, {}>, {}> | null>
        | LeanDocumentOrArrayWithRawType<UnpackedIntersection<HydratedDocument<ModelInterface, {}, {}>, {}> | null, Require_id<UnpackedIntersection<ModelInterface, {}>>>> {
        return await model
            .findOne(filter, projection)
            .populate(populateArray || [])
            .lean().exec()
    }

    static async add<ModelInterface, DataInterface>(
        model: Model<ModelInterface>,
        data: DataInterface
    ): Promise<ModelInterface | Document<unknown, any, ModelInterface>> {
        let new_object: HydratedDocument<ModelInterface, {}, unknown> = new model(data)
        return await new_object.save()
    }


    static async updateOne<ModelInterface, DataInterface>(
        model: Model<ModelInterface>,
        filter: FilterQuery<ModelInterface>,
        data: UpdateQuery<DataInterface>
    ): Promise<UpdateWriteOpResult> {
        return await model.updateOne(filter, { $set: data })
    }


    static async push<ModelInterface, DataInterface>(
        model: Model<ModelInterface>,
        query: FilterQuery<ModelInterface>,
        data: UpdateQuery<DataInterface>
    ): Promise<UpdateWriteOpResult> {
        return await model.updateOne(query, { $push: data })
    }

}

export default CRUD
