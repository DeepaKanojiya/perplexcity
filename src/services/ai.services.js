import { ChatGoogle } from "@langchain/google/node";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function testAi() {
 try {
     const response = await model.invoke("what india capital   ");
  console.log(response.content);
  console.log("hello")
 } catch (error) {
    console.log(error)
    
 }
}
