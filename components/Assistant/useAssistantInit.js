import { useEffect } from "react";
import useStore from "store/store";

const useAssistantInit = () => {
  const { setThread } = useStore();

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
  return null;
};
export default useAssistantInit;
