import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import {userRoute,signinRoute,signUpRoute} from './routes/users.js';
import {tweetRouter,retweetRouter} from './routes/tweets.js';
import mongoose  from 'mongoose';


import commentsRouter from './routes/comments.js';
import followRouter from './routes/followes.js'
import messagesRoute from './routes/messages.js'
import messagesTableRoute from './routes/messagesTableRoute.js'
import likeRouter from './routes/likes.js';
import { Server } from 'socket.io';

const app = express()
const port = 2000;
const host = '0.0.0.0';

mongoose.connect("mongodb+srv://abdullah:*************@cluster0.tjvij7f.mongodb.net/Twitter?retryWrites=true&w=majority")
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use('/uploads',express.static('uploads'))
app.use(cors());
app.use("/signUp",signUpRoute)
app.use("/signIn", signinRoute)
app.use("/users",userRoute)
app.use("/tweets",tweetRouter)
app.use("/retweet", retweetRouter)
app.use("/comments", commentsRouter)
app.use("/follow", followRouter)
app.use("/messages",messagesRoute)
app.use("/messagesTable",messagesTableRoute)
app.use("/like",likeRouter)


app.listen(port, host, () => {
    console.log('Listening on port ' + port);
  });
export const io = new Server({
    cors:{
        origin: "http://localhost:3000"
    }
})
let activeUsers = []
const addUser = (username, socketId) =>{
        if(!activeUsers.some((user)=> user.username === username)){
            activeUsers.push({username, socketId})
        }    
}

const removeUser = (socketId) => {
    activeUsers = activeUsers.filter((user)=> user.socketId !== socketId)
}

const getUser = (username) =>{
    return activeUsers.find((user)=> user.username === username)
}

io.on("connection", (socket)=>{
    socket.on("addUser", (username) =>{
        addUser(username,socket.id)
   })

   socket.on("online-users", ()=>{
    socket.emit("online-users", activeUsers )
   })
   

   socket.on("messaage",({senderName,receiverName,message,avatar})=>{
    const receiver = getUser(receiverName)
    console.log(receiverName)
    io.to(receiver?.socketId).emit("reciveMessage",{
        senderName,
        message: ` sent you message: ${message}`,
        msg:message,
        avatar
    })
})

   socket.on("notify", ({senderName,receiverName,avatar,type,comment,tweetId})=>{
       const receiver = getUser(receiverName)
       io.to(receiver?.socketId).emit("receiveNotification",{
           senderName,
           avatar,
           comment,
           message : type === 1 ? ' liked your tweet ❤️'
                   : type === 2 ? ' commented on your tweet:'
                   : type === 3 ? ' unliked your tweet 💔'
                   : type === 4 ? ' followed you' 
                   : type === 5 ? ' unfollowed you 💔'
                   : type === 6 ? ' sent a message to you:'
                   : ' sent you message:',
           tweetId,
           type
       })
   })
   
   let socketIds = []
   socket.on("mention", ({senderName,receiversNames,avatar,tweetId,type,comment,commentId})=>{
    JSON.parse(receiversNames).forEach((user)=>  socketIds.push(getUser(user)?.socketId))
    socketIds.forEach((socketId) => io.to(socketId).emit("reciveMention",{
        senderName,
        avatar,
        message : type === 1 ? ' mentioned you in his/her new tweet:' : ' mentioned you in a comment:',
        tweetId,
        commentId,
        comment,
        type
    }))
    console.log("receiversNames",receiversNames)
}
)
    socket.on("disconnect", ()=>{
        removeUser(socket.id)
        socket.on("online-users", ()=>{
            socket.emit("online-users", activeUsers )
           })
           
    })
})

io.listen(30001)
