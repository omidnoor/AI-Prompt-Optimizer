import { submitMessage } from "util/openai/submitMessage";

export const useMessageSubmission = (thread, setMessagesList) => {
  const handleMessageSequence = async (
    initialMessage,
    initialAssistantType,
    controlSubmitFunction
  ) => {
    let nextMessage = initialMessage;
    let nextType = initialAssistantType;

    while (nextMessage && nextType) {
      const data = await submitMessage(thread, nextMessage, nextType);
      const result = controlSubmitFunction(
        data,
        nextMessage,
        nextType,
        setMessagesList
      );
      if (result) {
        nextMessage = result.nextMessage;
        nextType = result.nextType;
      } else {
        break;
      }
    }
  };

  return { handleMessageSequence };
};
