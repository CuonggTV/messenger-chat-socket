import { Schema } from "mongoose";

export const MessageSchema = new Schema({
    from: {
        type: {
            id: String,
            name: String,
            avt: String
        },
        required: true
    },

    messages: String,
    timeStap: String
})

module.exports = MessageSchema;