// services/openai/assistants/initializeAssistant.js
import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";

const apiKey = config?.openaiApiKey;
// console.log("apiKey:", config);
// if (!apiKey) {
//   throw new Error("OpenAI API key not provided");
// }
const openai = new OpenAI({
  apiKey,
});

/**
 * Initialize an assistant with given parameters.
 * 
 *  import OpenAI from "openai";
    const openai = new OpenAI();
    async function main() {
      const myAssistant = await openai.beta.assistants.create({
        instructions:
          "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Math Tutor",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4",
      });
      console.log(myAssistant);
    }
    main();
 *
 * @param {Object} customParams - Custom parameters to initialize the assistant.
 * @returns The created assistant data.
 * 
 * {
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1698984975,
  "name": "Math Tutor",
  "description": null,
  "model": "gpt-4",
  "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
  "tools": [
    {
      "type": "code_interpreter"
    }
  ],
  "file_ids": [],
  "metadata": {}
}
 */
async function initializeAssistant(assistantType) {
  if (!assistantType) {
    throw new Error("Assistant type not provided");
  }
  const assistantConfig = config.assistant[assistantType];
  try {
    const assistant = await openai.beta.assistants.create(assistantConfig);
    return assistant;
  } catch (error) {
    console.error("Error initializing assistant:", error);
    throw error;
  }
}

export default initializeAssistant;
