import mongoose from "mongoose";
import { ChatMessageDto } from "./dto/chat-message.dto";
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

    static async insertMessage(profileId: string, message: string){
        await MessageModel.create({
            "from" : profileId,
            "message": message,
            "timeStap": new Date().toLocaleString()
        })

    }
    
}