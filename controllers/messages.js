import MessageModel from "../models/messages.js"
import MessagesTableModel from "../models/messagesTable.js"
import { io } from "../index.js"
const postmessage = async (request, response) => {
const message = request.body
const newMessage = new MessageModel({
    message: message.message,
    receiverId: message.receiverId,
    senderId: message.senderId,
    date: message.date
})
newMessage.save()
     .catch(err =>{
         console.log("#########",err)
         return response.send(err)

     });
    
     const newMessageTable = new MessagesTableModel({
        message: message.message,
        receiverId: message.receiverId,
        senderId: message.senderId,
        date: "2022-11-6"
    })
   MessagesTableModel.findOneAndDelete({senderId: message.senderId, receiverId: message.receiverId})
   .then(()=>{
   
        newMessageTable.save()
        .catch(err =>{
            console.log("#########",err)
            return response.send(err)
        })
    
   })
  

     response.send(newMessage)


}
const getMessages = (request, response) => {
    MessageModel.find((error,messages)=>{

        response.send(messages)

    
   })

}

const getMessagesTable = (request, response) => {
    MessagesTableModel.find((error,messages)=>{
        response.send(messages)
    })
}
export {postmessage,getMessages,getMessagesTable}