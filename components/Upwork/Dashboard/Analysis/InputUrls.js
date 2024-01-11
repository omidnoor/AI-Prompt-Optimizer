import useStore from "store/store";
import styles from "./styles.module.scss";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import useScreenshot from "components/ExtractData/useScreenshot";
import { memo, useCallback } from "react";

const InputUrls = ({ handleMessageSubmit }) => {
  const { urls, setUrls, isExtracting, isScreening, text } = useStore();

  const { fetchScreenshot } = useScreenshot();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      fetchScreenshot(urls);
    },
    [urls]
  );

  const formik = useFormik({
    initialValues: {
      urls: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.urls) {
        errors.urls = "url is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className={styles.container_form}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputTextarea
          placeholder="Enter URLs"
          inputid="urls"
          name="urls"
          rows={3}
          cols={50}
          className={`${styles.input} ${classNames({
            "p-invalid": isFormFieldInvalid("urls"),
          })}`}
          value={formik.values.urls}
          onChange={(e) => {
            formik.setFieldValue("urls", e.target.value);
            setUrls(e.target.value);
          }}
        />
        {getFormErrorMessage("urls")}
        <div className={styles.buttons}>
          <Button
            type="submit"
            raised
            className={styles.extract_button}
            label="Extract Data from URLs"
            disabled={!urls}
          />
          <Button
            label="Call Assistant"
            onClick={handleMessageSubmit}
            className={styles.assistant_button}
            disabled={isExtracting || isScreening || !text}
          />
        </div>
      </form>
    </div>
  );
};
export default memo(InputUrls);
