import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import useStore from "store/store";
import Answers from "./Answers";

const PromptOptimizer = () => {
  const [promptNumber, setPromptNumber] = useState(2);
  const { setPromptsGlobal, promptsGlobal } = useStore();
  const [answers, setAnswers] = useState([]);

  const formik = useFormik({
    initialValues: new Array(promptNumber).fill(""),
    validate: (values) => {
      const errors = values.map((value, index) =>
        !value ? `Prompt ${index + 1} is required` : null
      );
      return errors.some((error) => error) ? errors : {};
    },
    onSubmit: (values) => {
      // Handle form submission
      setPromptsGlobal(values);
      sendPromptsToBackend(values);
    },
  });

  const sendPromptsToBackend = async (values) => {
    try {
      // Send prompts to backend
      const response = await fetch("/api/promptOptimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompts: values,
        }),
      });
      const data = await response.json();

      let answers = [];

      data.answers.forEach((answer) => {
        const titles = answer.text
          .split(/\d+\.\s/)
          .slice(1)
          .map((title) => title.trim());
        answers.push(...titles);
      });

      shuffleArray(answers);
      setAnswers(answers);
      console.log(answers);
    } catch (error) {
      console.error("An error occurred--------------", error);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    formik.setValues(new Array(promptNumber).fill(""));
  }, [promptNumber]);

  const isFormFieldInvalid = (index) =>
    !!(formik.touched[index] && formik.errors[index]);

  const getFormErrorMessage = (index) => {
    return isFormFieldInvalid(index) ? (
      <small className="p-error">{formik.errors[index]}</small>
    ) : null;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik?.values.map((item, index) => (
        <div key={index} className="pb-1">
          <p>{`Prompt Template ${index + 1}`}</p>
          <InputTextarea
            name={`${index}`}
            id={`prompt${index}`}
            value={item}
            rows={5}
            cols={30}
            autoResize
            className={classNames({
              "p-invalid": isFormFieldInvalid(index),
            })}
            onChange={(e) => formik.setFieldValue(`${index}`, e.target.value)}
            onBlur={() => formik.setFieldTouched(`${index}`, true)}
          />
          {getFormErrorMessage(index)}
        </div>
      ))}
      <Button label="Submit" type="submit" icon="pi pi-check" />
      {answers.length !== 0 && <Answers answers={answers} />}
    </form>
  );
};

export default PromptOptimizer;
