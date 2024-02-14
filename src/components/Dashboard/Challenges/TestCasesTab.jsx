import React, { useState } from "react";
import styles from "./TestCasesTab.module.css"; // CSS Module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom';

const TestCasesTab = ({questionId,testCases, avaiableTestCases, setAvailableTestCases,filesRequired,setFilesRequired} ) => {
  const [inputText, setInputText] = useState(""); // Initialize with empty string
  const [outputText, setOutputText] = useState(""); // Initialize with empty string
  const [selectedTestCase,setSelectedTestCase] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update,setUpdate] = useState(false)


  const navigate = useNavigate();

  const handleAddTestCaseClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setInputText("")
    setUpdate(false)
    setOutputText("")
    setIsModalOpen(false); // Close the modal
  };

  const handleAddingTestCase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}questions/testcases/`, {
        method: 'POST',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
        body: JSON.stringify({id:questionId,
                              input:inputText,
                              output:outputText}),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setAvailableTestCases(avaiableTestCases+1)
      if (avaiableTestCases+1 >= testCases){
        setFilesRequired(false)

      }

      setInputText("")
      setOutputText("")

      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setIsModalOpen(false);
    }

  }

  const handleEdit = async (id) => {
    setUpdate(true)
    setSelectedTestCase(id)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}questions/testcases/?question=${questionId}&id=${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });


    const data = await response.json();
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is 
        // either bypassing 
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(data)
      setInputText(data[0].testCase)
      setOutputText(data[1].testCase)
      setIsModalOpen(true)
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  
  const handleUpdaingTestCase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}questions/testcases/`, {
        method: 'PUT',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          question:questionId,
          id:selectedTestCase,
          input:inputText,
          output:outputText
        }),
      });
      if(!response.ok){
        setIsModalOpen(false);
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsModalOpen(false);
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    } 
  }

  return (
    <div className={styles.container}>
      <div className={styles.testCasesTabContainer}>
        <h1 className={styles.testCasesTitle}>Test Cases List</h1>
        <table className={styles.testCasesTable}>
          <thead>
            <tr>
              <th>No</th>
              <th>Input</th>
              <th>Output</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: avaiableTestCases }).map((_, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{index+1}</td>
                <td>{`input${index+1}`}</td>
                <td>{`output${index+1}`}</td>
                <td>
                  <button onClick={() => handleEdit(index+1)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.addButtonContainer}>
          {filesRequired && (
          <button className={styles.addButton} onClick={handleAddTestCaseClick}>
            Add Test Cases
          </button>
          )}
        </div>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{ update ? `Update TestCase #${selectedTestCase}`:`Add Test Case #${avaiableTestCases+1}` }</h2>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Input</label>

                <textarea
                  className={styles.inputArea}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter input..."
                ></textarea>
              </div>
              <div className={styles.outputGroup}>
                <label className={styles.outputLabel}>Output</label>

                <textarea
                  className={styles.outputArea}
                  value={outputText}
                  onChange={(e) => setOutputText(e.target.value)}
                  placeholder="Enter output..."
                ></textarea>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addTestCaseButton}
                  onClick={() => update ? handleUpdaingTestCase() : handleAddingTestCase()}
                >
                  {update ? "Update Test Case" :"Add Test Case"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesTab;
