import Chatbot from "components/AssistantUI/Chatbot";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [thread, setThread] = useState(null);

  useEffect(() => {
    const initThread = async () => {
      const response = await fetch("/api/openai/createThreadAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const thread = await response.json();
      setThread(thread);
    };
    initThread();
  }, []);

  const handleTest = async () => {
    try {
      if (!thread) {
        throw new Error("Thread not initialized");
      }
      const message = await fetch("/api/openai/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          threadId: thread?.thread.id,
          userMessage:
            "	I need to solve the equation 3x + 11 = 14. Can you help me?",
        }),
      });
      const data = await message.json();
      setMessagesList(data.retrievedMessagesList.data);
      setError("");
    } catch (err) {
      setError(err.message);
      setData("");
    }
  };

  return (
    <div>
      <Chatbot messagesList={messagesList} threadId={thread?.thread.id} />
      {/* <button onClick={handleTest}>Run Test</button> */}
      {/* {data && (
        <div>
          <strong>data:</strong>
          {messagesList &&
            messagesList.map((message, index) => (
              <h1 key={index}>{message.content[0].text.value}</h1>
            ))}
        </div>
      )} */}
      {error && (
        <div>
          <strong>Error:</strong>
        </div>
      )}
    </div>
  );
};

export default Test;
