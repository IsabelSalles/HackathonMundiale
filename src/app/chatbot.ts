import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-exp" });

export const perguntaChatbot = async (pergunta: string): Promise<string> => {
    const result = await model.generateContent(pergunta);
    return result.response.text();
}