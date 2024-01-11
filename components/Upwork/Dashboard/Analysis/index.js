import LoadingProgress from "components/Loading";
import useStore from "store/store";
import styles from "./styles.module.scss";
import OCRUploader from "components/ExtractData/OCRUploader";
import { Button } from "primereact/button";
import Error from "components/Error";
import InputUrls from "./InputUrls";
import Outputs from "./Outputs";

const Analysis = ({ handleMessageSubmit }) => {
  const { error, loading, loadingText, ocrProgress } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_actions}>
          <div className={styles.loading}>
            {loading && loadingText.includes("Fetching screenshot") && (
              <LoadingProgress>{loadingText}</LoadingProgress>
            )}
            {loading && loadingText.includes("Extracting text") && (
              <LoadingProgress ocrProgress={ocrProgress}>
                {loadingText}
              </LoadingProgress>
            )}
          </div>
          <InputUrls handleMessageSubmit={handleMessageSubmit} />
          <OCRUploader />
          <Outputs />
        </div>
      </div>

      {error && <Error>{error}</Error>}
    </div>
  );
};
export default Analysis;
