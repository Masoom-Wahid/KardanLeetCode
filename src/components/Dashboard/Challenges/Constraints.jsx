import React, { useState } from "react";
import styles from "./Constraints.module.css";

const Constraints = () => {
  const [constraint, setConstraint] = useState("");

  return (
    <div className="constraintContainer">
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Constraint</label>

        <textarea
          className={styles.inputArea}
          value={constraint}
          onChange={(e) => setConstraint(e.target.value)}
          placeholder="Enter the constraints..."
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </div>
  );
};

export default Constraints;
