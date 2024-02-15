import styles from "./SubmissionPage.module.css";
import SubmissionsList from "./SubmissionsList";

const SubmissionPage = ({contestData}) => {
  return (
    <>
      <h1 className={styles.titleSubmission}>Submissions</h1>
      <SubmissionsList usersTab={false} contestData={contestData} />
    </>
  );
};

export default SubmissionPage;
