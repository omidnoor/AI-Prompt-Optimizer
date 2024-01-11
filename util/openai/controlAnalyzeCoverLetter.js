import { extractContent } from "./extractContent";

export const controlSubmitFunction = (
  data,
  lastMessage,
  lastType,
  setMessagesList
) => {
  let extractContentResponse = extractContent(data);
  if (
    data.status === "completed" &&
    lastType === "assistant_upwork_job_extractor"
  ) {
    setMessagesList((prev) => [
      ...prev,
      {
        role: "Assistant",
        content: extractContentResponse,
      },
    ]);
    return {
      nextMessage: { role: "user", content: extractContentResponse },
      nextType: "assistant_upwork_job_analyzer",
    };
  } else if (
    data.status === "completed" &&
    lastType === "assistant_upwork_job_analyzer"
  ) {
    setMessagesList((prev) => [
      ...prev,
      {
        role: "Assistant",
        content: extractContentResponse,
      },
    ]);
    return {
      nextMessage: { role: "user", content: extractContentResponse },
      nextType: "assistant_upwork_cover_letter_writer",
    };
    // Handle the final completion
  } else if (
    data.status === "completed" &&
    lastType === "assistant_upwork_cover_letter_writer"
  ) {
    setMessagesList((prev) => [
      ...prev,
      {
        role: "Assistant",
        content: extractContentResponse,
      },
    ]);
    return { nextMessage: null, nextType: null };
  }
  // Handle other statuses or types
};
