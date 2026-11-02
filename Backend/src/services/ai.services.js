import { ChatGoogle } from "@langchain/google/node";
import { MistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import dotenv from "dotenv";
dotenv.config();

const googleModel = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new MistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateNewResponse(message) {
  const response = await googleModel.invoke([new HumanMessage(message)]);

  return response.text
}

export async function generateResponse(messages) {
  const response = await googleModel.invoke(
    messages.map((msg) => {
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );

  return response.text;
}

export async function generateChatTitle(message) {
  const response = await googleModel.invoke([
    new SystemMessage(`
            you are a helpful assistant that generates concise and description title for chat conversations.

            user will provide you with the first message of chat conversation, and you will generate a title that 
            captures the essence of the conversation in 2-4 words. the litle should be clear, relevant, and engaging 
            `),
    new HumanMessage(`
               Generate a title for a chat conversation based on the following first message:
               "${message}"
               `),
  ]);

  return response.text;
}
