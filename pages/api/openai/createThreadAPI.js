// pages/api/openai/startConversation.js
import { createThread } from "../../../Services/openai/threads/createThread";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const thread = await createThread();

      res.status(200).json({ thread });
    } catch (error) {
      console.error("Error starting a new conversation:", error);
      res.status(500).json({ message: "Error starting a new conversation" });
    }
  } else {
    res.status(405).end();
  }
}
