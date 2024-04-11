import express from 'express'
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import MessageService from './message/message.service';
import AuthService from './auth/auth.service';
import SendMessageDto from './message/dto/send-message.dto';


const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*"
  }
})

const port =  9000;

io.on('connection', (socket) =>{
  console.log("A user connected");
  socket.emit("UPDATE_CHAT", MessageService.loadChatData());

  socket.on("SEND_MESSAGE", (dto: SendMessageDto) => {
    console.log("A user send a message");
    AuthService.getProfile(dto.accessToken, async (err,profile) => {
      if(!profile){
        console.log("Error when sending message: "+err);
      }
      else{
        // Save message
        console.log("Profile: "+profile.id +" - "+profile.name+" - "+profile.avt)
        console.log("Message: "+dto.message)

        await MessageService.insertMesssage(profile.id,dto.message);
        MessageService.updateChatData(profile.id,dto.message);
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
