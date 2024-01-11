import { ProgressBar } from "primereact/progressbar";
import styles from "./styles.module.scss";

const LoadingProgress = ({ ocrProgress, children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bars}>
          {ocrProgress > 0 && ocrProgress !== 100 && (
            <ProgressBar
              style={{ height: "14px", color: "green", width: "400px" }}
              value={Math.floor(ocrProgress * 100)}
            />
          )}
          {
            (ocrProgress =
              0 ||
              (ocrProgress === 100 && (
                <ProgressBar
                  mode="indeterminate"
                  style={{ height: "14px", color: "green" }}
                />
              )))
          }
        </div>
        <div className={styles.text}>{children}</div>
      </div>
    </>
  );
};
export default LoadingProgress;
