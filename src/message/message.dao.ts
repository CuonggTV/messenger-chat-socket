import mongoose from "mongoose";
import User from "../user/user.entity";
import { UserDto } from "../user/dto/user.dto";
const MessageSchema = require('./message.schema');


const MessageModel = mongoose.model('messages', MessageSchema)

export default class MessageDao {
    static async getAll (){
        return await MessageModel.aggregate([  
            {$unwind: '$from'}, // Unwind the from array
            {
                $addFields: {
                    "from.id": { $toString: "$from._id" }, // Convert _id to string type
                    "from._id": "$$REMOVE", // Remove the original _id field
                    "id": { $toString: "$_id" } // Convert _id to string type
                }
            },
            {
                $project: {
                    __v: 0 ,
                    _id: 0
                }
            }
        ]);
    }

    // static async getAll(){
    //     return await MessageModel.find({}).select('-__v');
    // }

    static async insertMessage(profile: UserDto, message: string){
        await MessageModel.create({
            "from" : profile,
            "message": message,
            "timeStap": new Date().toLocaleString()
        })

    }
    
}