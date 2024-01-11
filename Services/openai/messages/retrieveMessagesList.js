// services/openai/messages/retrieveMessage.js
import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Retrieve the messages list from a thread.
 *
 * @param {string} threadId - The ID of the thread from which the message is to be retrieved.
 * @returns The retrieved messages list.
 *
 *
 *
 **/

async function retrieveMessagesList(threadId) {
  try {
    const retrievedMessagesList = await openai.beta.threads.messages.list(
      threadId
    );
    // console.log(
    //   `Retrieved message: ${JSON.stringify(retrievedMessagesList, null, 2)}`
    // );
    return retrievedMessagesList;
  } catch (error) {
    console.error("Error retrieving message:", error.message);
    throw error;
  }
}

export { retrieveMessagesList };
