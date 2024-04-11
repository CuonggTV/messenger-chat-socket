import { UserDto } from "../user/dto/user.dto";
import { ChatMessageDto } from "./dto/chat-message.dto";
import MessageDao from "./message.dao";

export default class MessageService {
    static async loadChatData() {
        const messages = await MessageDao.getAll();

        let chatData: ChatMessageDto[] ;
        let i: number = 0
        messages.forEach((mess) => {
            console.log(mess.from._id)
            
        })
        
    }
    static updateChatData(profileId: string, message: string){
        
    }

    static async insertMesssage(profileId: string, message: string){
        try{
            await MessageDao.insertMessage(profileId,message)
        }
        catch(err){
            console.log("Insert message error: " + err);
        }
    }
}