import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema({
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

const MessageModel = mongoose.model("messages", MESSAGE_SCHEMA)
export default MessageModel