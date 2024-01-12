import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

const Answers = ({ answers }) => {
  const [visible, setVisible] = useState(false);
  const [annotations, setAnnotations] = useState({});
  console.log(annotations);
  useEffect(() => {
    if (!!answers && answers.length !== 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [answers]);
  return (
    <Dialog
      header="AI Answers"
      visible={visible}
      style={{ width: "90vw" }}
      onHide={() => setVisible(false)}
    >
      {!!answers &&
        answers.length !== 0 &&
        answers.map((answer, index) => (
          <Card
            key={index}
            className="mb-3 flex align-items-center justify-content-center p-4 bg-gray-200 border-round shadow-1"
          >
            <div className="flex align-items-center justify-content-center">
              <div>{answer}</div>
              <div className="flex gap-1 flex-column">
                <Button
                  className={`bg-green-500 border-none ${
                    annotations[answer] === true ? "bg-green-900" : ""
                  }`}
                  icon="pi pi-thumbs-up"
                  onClick={() =>
                    setAnnotations({ ...annotations, [answer]: true })
                  }
                />
                <Button
                  className={`bg-red-500 border-none ${
                    annotations[answer] === false ? "bg-red-900" : ""
                  }`}
                  icon="pi pi-thumbs-down"
                  onClick={() =>
                    setAnnotations({ ...annotations, [answer]: false })
                  }
                />
              </div>
            </div>
          </Card>
        ))}
    </Dialog>
  );
};
export default Answers;
