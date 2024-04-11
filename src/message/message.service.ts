import { UserDto } from "../user/dto/user.dto";
import User from "../user/user.entity";
import { ChatMessageDto } from "./dto/chat-message.dto";
import MessageDao from "./message.dao";

export default class MessageService {
    static async loadChatData() {
        const rawMessages = await MessageDao.getAll(); // Assuming this returns plain objects
    
        let chatData: ChatMessageDto[] = [];
        
        for (let i = 0; i < rawMessages.length; i++) {
            const currentMessage = rawMessages[i];
            const lastChat = chatData[chatData.length - 1]; // Get the last chat in the array
    
            if (!lastChat || lastChat.from.name !== currentMessage.from.name) {
                // New sender, push a new chat object
                chatData.push({
                    from: currentMessage.from,
                    messages: [currentMessage.messages]
                });
            } else {
                // Same sender, push the message to the existing chat
                lastChat.messages.push(currentMessage.messages);
            }
        }
    
        console.log(chatData);
    
        return chatData;
    }

    static async insertMesssage(profile: UserDto, message: string){
        try{
            await MessageDao.insertMessage(profile,message)
        }
        catch(err){
            console.log("Insert message error: " + err);
        }
    }
}