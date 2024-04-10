import mongoose from "mongoose";
const MessageSchema = require('./message.schema');


const MessageModel = mongoose.model('messages', MessageSchema)

export default class MessageDao {
    static async getAll (){
        return await MessageModel.aggregate([  
            {
                $lookup: {
                    from: "users",
                    localField: "from",
                    foreignField: "_id",
                    as: "from",
                },
            },
            {
                $unwind: "$from"
            }
        ]);
    }
    //const currentDate = new Date().toLocaleString();
}