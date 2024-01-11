// pages/api/openai/sendMessage.js
import { addMessageToThread } from "../../../Services/openai/messages/addMessageToThread";
import { retrieveMessagesList } from "../../../Services/openai/messages/retrieveMessagesList";
import assistantContainer from "../../../Services/openai/assistants/assistantContainer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { threadId, message, assistantType } = req.body;
    try {
      let updatedThread = await addMessageToThread(threadId, message);

      if (updatedThread.content && updatedThread.content.length > 0) {
        const firstContentItem = updatedThread.content[0];

        if (firstContentItem.type === "text" && firstContentItem.text) {
          // console.log(" firstContentItem ", firstContentItem.text.value);
        }
      }

      const runAssistantResponse = await assistantContainer(
        threadId,
        assistantType
      );
      let retrievedMessagesList = [];
      if (runAssistantResponse.status === "completed") {
        retrievedMessagesList = await retrieveMessagesList(threadId);
        console.log(`-------------completed--------------`);

        res.status(200).json({ status: "completed", retrievedMessagesList });
      } else if (runAssistantResponse.status === "requires_action") {
        const function_calling_response =
          runAssistantResponse.required_action.submit_tool_outputs.tool_calls[0]
            .function.arguments;

        res
          .status(200)
          .json({ status: "requires_action", function_calling_response });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
