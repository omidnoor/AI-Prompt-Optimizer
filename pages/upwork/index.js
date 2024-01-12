import useAssistantInit from "components/Assistant/useAssistantInit";
import { useMessageSubmission } from "components/Assistant/useMessageSubmission";
import Upwork from "components/Upwork";
import { useCallback, useEffect } from "react";
import useStore from "store/store";
import { controlSubmitFunction } from "util/openai/controlSubmitFunction";

const upwork = () => {
  // const { thread, setThread, text, messagesList, setMessagesList } = useStore();
  // useAssistantInit();

  // useEffect(() => {
  //   if (text.trim()) {
  //     setMessagesList((prev) => [...prev, { role: "user", content: text }]);
  //   }
  // }, [text, thread]);

  // const { handleMessageSequence } = useMessageSubmission(
  //   thread,
  //   setMessagesList
  // );

  // const handleMessageSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     if (text.trim()) {
  //       // let updatedThread = await addMessageToThread();
  //       setMessagesList((prev) => [...prev, { role: "user", content: text }]);
  //       let message = { role: "user", content: text };
  //       handleMessageSequence(
  //         message,
  //         "assistant_upwork_job_analyzer",
  //         controlSubmitFunction
  //       );
  //     }
  //   },
  //   [text, thread]
  // );
  // console.log(messagesList);
  return (
    <>
      {/* <Upwork
        messagesList={messagesList}
        handleMessageSubmit={handleMessageSubmit}
      /> */}
    </>
  );
};
export default upwork;
