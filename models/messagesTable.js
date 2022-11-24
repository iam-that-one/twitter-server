import mongoose from "mongoose";

const  MESSAGE_TABLE_SCHEMA= new mongoose.Schema({
    message: {
        type: String,
        require: false
    },
    senderId: {
        type: String,
        require: false
    },
    receiverId: {
        type: String,
        require: false
    },
    date: {
        type: String,
        require: false
    },
})

const MessagesTableModel = mongoose.model("messagesTable", MESSAGE_TABLE_SCHEMA)
export default MessagesTableModel