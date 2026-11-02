import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authMiddleware, sendMessage);
chatRouter.get("/", authMiddleware, getChats);
chatRouter.get("/message/:chatId", authMiddleware, getMessages);
chatRouter.delete('/:chatId',authMiddleware,deleteChat)

export default chatRouter;
