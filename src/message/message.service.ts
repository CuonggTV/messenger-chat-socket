import { UserDto } from "../user/dto/user.dto";
import { ChatMessageDto } from "./dto/chat-message.dto";
import MessageDao from "./message.dao";

export default class MessageService {
    static async loadChatData() {
        const rawMessages = await MessageDao.getAll(); // Assuming this returns plain objects

        let chatData: ChatMessageDto[] ;
        let j: number = 0;
        for(let i =0;i<rawMessages.length;i++){
            if(chatData[j].from.id == rawMessages.from.id ){

            }
        }
        
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