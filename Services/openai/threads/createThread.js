import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Create a new conversation thread.
 *
 * @returns The created thread data.
 * 
 * {
    "id": "thread_abc123",
    "object": "thread",
    "created_at": 1698107661,
    "metadata": {}
    }
 */
async function createThread() {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

export { createThread };
