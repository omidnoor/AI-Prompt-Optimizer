// services/openai/assistants/initializeAssistant.js
import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";
import initializeAssistant from "./initializeAssistant";
import { runAssistant } from "./runAssistant";

const apiKey = config?.openaiApiKey;

const openai = new OpenAI({
  apiKey,
});

async function assistantContainer(threadId, assistantType) {
  try {
    const assistant = await initializeAssistant(assistantType);
    const runAssistantResponse = await runAssistant(threadId, assistant);
    return runAssistantResponse;
  } catch (error) {
    console.error("Error in assistantContainer module:", error);
    throw error;
  }
}

export default assistantContainer;
