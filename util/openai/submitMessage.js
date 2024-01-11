import { sendMessage } from "./sendMessage";

export const submitMessage = async (thread, message, assistantType) => {
  const data = await sendMessage(thread, message, assistantType);
  return data;
};
