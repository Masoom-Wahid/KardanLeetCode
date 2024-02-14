import styles from "./SubmissionPage.module.css";
import SubmissionsList from "./SubmissionsList";

const SubmissionPage = () => {
  return (
    <>
      <h1 className={styles.titleSubmission}>Submissions</h1>
      <SubmissionsList showLastSubmission={true} />
    </>
  );
};

export default SubmissionPage;
