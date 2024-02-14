import React, { useState } from "react";
import styles from "./Constraints.module.css";
import { useNavigate } from "react-router-dom";

const Constraints = ({consts,setconsts,questionId}) => {
  const [value,setValue] = useState(consts !== undefined ? consts.consts : "");
  const [loading,setLoading] = useState(false)

  console.log(consts)
  const navigate = useNavigate();

  const handleUpdate = async () => {
    setLoading(true)
    let temp_data = {
      "question":questionId,
      "consts":value
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}constraints/${consts.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(temp_data),
        }
      );
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setconsts({...temp_data,"id":consts.id})
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setLoading(false)
    }


  }
  const handleCreate = async () => {
    setLoading(true);
    let temp_data= {
      "question":questionId,
      "consts":value
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}constraints/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(temp_data),
        }
      );
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setconsts({...temp_data,"id":data.id})

    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="constraintContainer">
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Constraint</label>

        <textarea
          className={styles.inputArea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={value}
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton} onClick={() => consts !== undefined ? handleUpdate() : handleCreate()} >
        {loading ? "loading...." : consts !== undefined ?  "Save Changes" : "Create Constraint"}
      </button>
    </div>
  );
};

export default Constraints;
