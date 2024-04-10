import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const MessageSchema = new Schema({
    id:  {
        type: ObjectId,
        required: true,
        auto: true,
    },
    from: String,
    message: String,
    timeStap: String
})

module.exports = MessageSchema;