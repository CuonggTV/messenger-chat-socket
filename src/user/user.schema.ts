import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const UserSchema = new Schema({
    _id:  {
        type: ObjectId,
        required: true,
        auto: true,
    },
    name: String,
    avt: String 
})

module.exports = UserSchema;