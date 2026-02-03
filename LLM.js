import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readlineSync from "readline-sync";

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const history = [];
async function chatting(userProblem) {
  history.push({
    role: "user",
    parts: [{ text: userProblem }],
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
  });
  history.push({
    role: "model",
    parts: [{ text: response.text }],
  });
  console.log(response.text);
}

async function main() {
  const userProblem = readlineSync.question("ask me anything: ");
  await chatting(userProblem);
  main();
}

main();
