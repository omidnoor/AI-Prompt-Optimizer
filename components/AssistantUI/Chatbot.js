import { Button } from "primereact/button";
import styles from "./styles.module.scss";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { useEffect, useState } from "react";
import { messageExtractor } from "util/openai/messageExtractor";

const Chatbot = ({ messagesList, threadId }) => {
  const [messages, setMessages] = useState(
    messagesList?.map((message) => ({
      role: message.role,
      content: message.content[0]?.text?.value || "",
    }))
  );
  const [userMessage, setUserMessage] = useState("");
  const onChangeMessagesBox = (value) => {};

  useEffect(() => {
    setMessages(
      messagesList?.map((message) => ({
        role: message.role,
        content: message.content[0]?.text?.value || "",
      }))
    );
  }, [messagesList]);

  const messageTemplate = (messages) => {
    return (
      <div className={styles.messageTemplate}>
        <div className={styles.role}>{messages?.role}</div>
        <div className={styles.content}>{messages?.content}</div>
      </div>
    );
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      const response = await fetch("/api/openai/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId,
          userMessage: userMessage,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "Assistant",
          content:
            data.retrievedMessagesList.data[0].content[0].text.value || "",
        },
      ]);
      setUserMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <ListBox
        value={messagesList}
        onChange={(e) => onChangeMessagesBox(e.value)}
        options={messages}
        // optionLabel="name"
        itemTemplate={messageTemplate}
        className={styles.messagesBox}
        listStyle={{ maxHeight: "250px" }}
        emptyMessage="Ask a question from the AI assistant"
      />
      <form onSubmit={handleMessageSubmit} className={styles.form}>
        <InputText
          className={styles.input}
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
        />
        <Button
          type="submit"
          label="Send"
          icon="pi pi-send"
          className={styles.button}
        />
      </form>
    </div>
  );
};
export default Chatbot;
