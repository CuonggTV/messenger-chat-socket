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
}