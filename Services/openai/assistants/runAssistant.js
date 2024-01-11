// services/openai/run/runAssistant.js
import config from "../../../config/openaiConfig/config";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Run the assistant on a specific conversation thread.
 *
 * @param {string} threadId - The ID of the thread on which the assistant is to be run.
 * @returns The assistant's runAssistantResponse after processing the thread.
 */
async function runAssistant(threadId, assistant) {
  try {
    const assistantId = assistant.id;
    // console.log(assistant);
    let runAssistantResponse = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runAssistantResponse = await openai.beta.threads.runs.retrieve(
        threadId,
        runAssistantResponse.id
      );
      if (runAssistantResponse.status === "completed") {
        console.log(`Completed: -----------------------`);
        break;
      } else if (runAssistantResponse.status === "requires_action") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
        console.log(
          `runAssistantResponse::::::: ${runAssistantResponse.required_action.submit_tool_outputs.tool_calls}`
        );
        const run = await openai.beta.threads.runs.submitToolOutputs(
          threadId,
          runAssistantResponse.id,
          {
            tool_outputs:
              runAssistantResponse.required_action.submit_tool_outputs.tool_calls.map(
                (tools) => {
                  return {
                    tool_call_id: tools.id,
                    output: tools.function.arguments,
                  };
                }
              ),
          }
        );
        // console.log(
        //   runAssistantResponse.required_action.submit_tool_outputs.tool_calls[0]
        //     .function.arguments
        // );
        // break;
      } else if (runAssistantResponse.status === "canceled") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
      } else if (runAssistantResponse.status === "failed") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
      } else if (runAssistantResponse.status === "expired") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
      } else if (runAssistantResponse.status === "in_progress") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
      } else if (runAssistantResponse.status === "queued") {
        console.log(
          `runAssistantResponse.status: ${runAssistantResponse.status}`
        );
      }
    }
    return runAssistantResponse;
  } catch (error) {
    console.error("Error in runAssistant module:", error);
    throw error;
  }
}

export { runAssistant };
