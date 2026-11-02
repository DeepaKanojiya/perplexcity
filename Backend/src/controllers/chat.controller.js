import chatModel from "./../model/chat.model.js";
import messageModel from "./../model/message.model.js";
import {
  generateResponse,
  generateNewResponse,
  generateChatTitle,
} from "../services/ai.services.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let chat = null;
  let ChatTitle = null;

  if (!chatId) {
    ChatTitle = await generateChatTitle(message);

    chat = await chatModel.create({
      user: req.user.id,
      title: ChatTitle,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  let result = null;
  let messages = null;
  if (!chatId) {
    result = await generateNewResponse(message);
  } else {
    messages = await messageModel.find({ chat: chatId });
    result = await generateResponse(messages);
  }
  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });

  res.json({
    ChatTitle,
    chat,
    userMessage,
    aiMessage,
  });
}

export async function getChats(req, res) {
  const userId = req.user.id;

  const chats = await chatModel.find({
    user: userId,
  });

  res.json({
    message: "chats found successfully",
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;
  console.log(chatId);

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({ message: "chat not found" });
  }

  const messages = await messageModel.find({
    chat: chat._id,
  });

  res.json({
    message: "messages found successfully",
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findByIdAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  const messages = await messageModel.findByIdAndDelete({
    chat: chat._id,
  });

  res.status(200).json({ message: "chats and messages deleted" });
}
