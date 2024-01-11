// testAssistant.js

import initializeAssistant from "Services/openai/assistants/initializeAssistant";
import createThread from "Services/openai/threads/createThread";
import addMessageToThread from "Services/openai/messages/addMessageToThread";

import runAssistant from "Services/openai/assistants/runAssistant";

export async function testAssistant() {
  try {
    console.log("Initializing Assistant...");
    const assistantId = await initializeAssistant();

    console.log("Creating a new thread...");
    const threadId = await createThread();

    console.log("Adding a message to the thread...");
    await addMessageToThread(threadId, {
      role: "user",
      content: "Hello, can you help me?",
    });

    console.log("Running the assistant...");
    const response = await runAssistant(threadId, assistantId);

    console.log("Assistant's Response:", response);
  } catch (error) {
    console.error("Error during test:", error);
  }
}

// testAssistant();
