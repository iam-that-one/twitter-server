import express from "express";
import { postmessage,getMessages,getMessagesTable } from "../controllers/messages.js";
const messagesRoute = express.Router()
messagesRoute.post("/", postmessage)
messagesRoute.get("/", getMessages)
messagesRoute.get("/", getMessagesTable)

export default messagesRoute