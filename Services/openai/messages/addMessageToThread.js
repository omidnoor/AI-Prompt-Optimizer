// services/openai/messages/addMessageToThread.js
import config from "config/openaiConfig/config";
import OpenAI from "openai";
console.log(`config.openaiApiKey: ${config?.openaiApiKey}`);
const openai = new OpenAI({
  apiKey: config?.openaiApiKey,
});

/**
 * A Message contains text, and optionally any files that you allow the user to upload. 
 * 
 * example:
*   const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
        }
    );
 *
 * @param {string} threadId - The ID of the thread to which the message is to be added.
 * @param {Object} message - The message object containing the message details.
 * @returns The updated thread data after adding the message.
 * 
 * {
    "id": "msg_abc123",
    "object": "thread.message",
    "created_at": 1698983503,
    "thread_id": "thread_abc123",
    "role": "assistant",
    "content": [
        {
        "type": "text",
        "text": {
            "value": "Hi! How can I help you today?",
            "annotations": []
        }
        }
    ],
    "file_ids": [],
    "assistant_id": "asst_abc123",
    "run_id": "run_abc123",
    "metadata": {}
    }
 */
async function addMessageToThread(threadId, message) {
  try {
    const updatedThread = await openai.beta.threads.messages.create(threadId, {
      role: message.role, // 'user' or 'assistant'
      content: message.content,
    });
    return updatedThread;
  } catch (error) {
    console.error("Error adding message to thread:", error);
    throw error;
  }
}

export { addMessageToThread };
