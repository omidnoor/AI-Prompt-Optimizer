import styles from "./styles.module.scss";

const Error = ({ error }) => {
  return (
    <div className={styles.container}>
      <p>{error}</p>
    </div>
  );
};
export default Error;
