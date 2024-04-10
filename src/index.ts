import express from 'express'
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import MessageService from './message/message.service';

const API_URL = "http://localhost:3000";

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

  socket.on("SEND_MESSAGE", () => {
    console.log("A client disconnected");
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
