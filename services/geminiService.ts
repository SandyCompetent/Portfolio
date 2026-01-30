import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. The Chat feature might not work.");
    // In a real app, handle this gracefully. For this demo, we assume valid env.
  }
  return new GoogleGenAI({ apiKey: apiKey });
};

export const initializeChat = async (): Promise<Chat> => {
  const ai = getAiClient();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // A bit of creativity for the persona
    },
  });
  return chatSession;
};

export const sendMessageToSandeepAI = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const streamResult = await chatSession.sendMessageStream({ message });
    
    // Create a generator to yield text chunks
    async function* streamGenerator() {
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }
    
    return streamGenerator();

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // Reset session on error in case of bad state
    chatSession = null;
    throw error;
  }
};
