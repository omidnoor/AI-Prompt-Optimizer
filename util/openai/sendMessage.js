export const sendMessage = async (thread, message, assistantType) => {
  const response = await fetch("/api/openai/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      threadId: thread?.thread.id,
      message,
      assistantType,
    }),
  });
  return response.json();
};
