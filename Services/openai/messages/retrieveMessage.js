// services/openai/messages/retrieveMessage.js
import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Retrieve a message from a thread.
 *
 * @param {string} threadId - The ID of the thread from which the message is to be retrieved.
 * @param {string} messageId - The ID of the message to be retrieved.
 * @returns The retrieved message data.
 *
 **/

async function retrieveMessage(threadId, messageId) {
  try {
    // console.log(`Retrieving message: ${messageId} from thread: ${threadId}`);
    const retrievedMessage = await openai.beta.threads.messages.retrieve(
      threadId,
      messageId
    );
    // console.log(
    //   `Retrieved message: ${JSON.stringify(retrievedMessage, null, 2)}`
    // );
    return retrievedMessage;
  } catch (error) {
    console.error("Error retrieving message:", error.message);
    throw error;
  }
}

export { retrieveMessage };
