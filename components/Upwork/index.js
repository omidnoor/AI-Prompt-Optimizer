import { useEffect } from "react";
import useStore from "store/store";
import Dashboard from "./Dashboard/Dashboard";
import Analysis from "./Dashboard/Analysis";

const Upwork = ({ handleMessageSubmit }) => {
  const { setUrls } = useStore();

  // useEffect(() => {
  //   setUrls("");
  // }, []);

  return (
    <>
      <Dashboard handleMessageSubmit={handleMessageSubmit} />
    </>
  );
};
export default Upwork;
