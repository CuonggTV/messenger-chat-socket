import express from 'express'
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import MessageService from './message/message.service';
import AuthService from './auth/auth.service';
import SendMessageDto from './message/dto/send-message.dto';
import { UserDto } from './user/dto/user.dto';


const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*"
  }
})

const port =  9000;

io.on('connection',async (socket) =>{
  console.log("A user connected");
  socket.emit("UPDATE_CHAT",await MessageService.loadChatData());

  socket.on("SEND_MESSAGE", (dto: SendMessageDto) => {
    console.log("A user send a message");
    AuthService.getProfile(dto.accessToken, async (err: Error | null, profile: UserDto | null) => {
      if(profile){
        // Save message
        console.log("Profile: "+profile.id +" - "+profile.name+" - "+profile.avt)
        console.log("Message: "+dto.message)

        await MessageService.insertMesssage(profile,dto.message);
        io.emit("UPDATE_CHAT",await MessageService.loadChatData())
        
      }
      else{
        console.log("Error when sending message: "+err);
      }
    })
  });



  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
})


mongoose.connect('mongodb://localhost:27017/messenger').then(() =>{
  server.listen(port,() => {
    console.log("Server started at port " + port +"!");
  })
});
