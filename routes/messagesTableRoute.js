import express from "express";
import {getMessagesTable } from "../controllers/messages.js";
const messagesTableRoute = express.Router()

messagesTableRoute.get("/", getMessagesTable)

export default messagesTableRoute