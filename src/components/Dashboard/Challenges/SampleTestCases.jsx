import React, { useState } from "react";
import styles from "./SampleTestCases.module.css"; // CSS Module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"

const SampleTestCases = ({sample,setsample,questionId}) => {
  const [inputText, setInputText] = useState(""); // Initialize with empty string
  const [outputText, setOutputText] = useState(""); // Initialize with empty string
  const [explanationText,setExplanationText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update,setUpdate] = useState(false)
  const [selectedId,setSelectedId] = useState()


  console.log(sample)

  const navigate = useNavigate();


  const handleAddTestCaseClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateSample = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}samples/${selectedId}/`, {
        method: 'PUT',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          question:questionId,
          sample:inputText,
          answer:outputText,
          explanation:explanationText
        }),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    } finally{
      setIsModalOpen(false)
    }
  }

  const handleShowUpdateModal = async (id) => {
    setUpdate(true)
    setSelectedId(id)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}samples/${id}/`, {
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
      setInputText(data.sample)
      setOutputText(data.answer)
      setExplanationText(data.explanation)
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setInputText("")
    setOutputText("")
    setExplanationText("")
    setUpdate(false)
    setIsModalOpen(false); // Close the modal
  };

  const handleAddSample =  async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}samples/`, {
        method: 'POST',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
        body: JSON.stringify({question:questionId,
                              sample:inputText,
                              answer:outputText,
                              explanation:explanationText
                              }),
      });
      const data = await response.json();
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setsample(prev => [...prev, data]);
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setInputText("")
      setOutputText("")
      setExplanationText("")
      setIsModalOpen(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.testCasesTabContainer}>
        <h1 className={styles.testCasesTitle}>Sample Test Cases</h1>
        {sample && ( 
        <><table className={styles.testCasesTable}>
            <thead>
              <tr>
                <th>Sample</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {
              sample.map((data,index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{`Sample ${index + 1}`}</td>
                <td><button onClick={() => handleShowUpdateModal(data.id)}>Edit</button></td>
              </tr>
              ))
            }

            </tbody>
          </table><div className={styles.addButtonContainer}>

              {sample.length < 2 ?
              <button className={styles.addButton} onClick={handleAddTestCaseClick}>
                Add Test Cases
              </button> : <></>}

            </div></>
          )}

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{update ? "Update Test Case" : "Add Test Cases" }</h2>
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
                  placeholder="Input ....."
                ></textarea>
              </div>
              <div className={styles.outputGroup}>
                <label className={styles.outputLabel}>Output</label>

                <textarea
                  className={styles.outputArea}
                  value={outputText}
                  onChange={(e) => setOutputText(e.target.value)}
                  placeholder="Output ....."
                ></textarea>
              </div>
              <div className={styles.outputGroup}>
                <label className={styles.outputLabel}>Explanation</label>

                <textarea
                  className={styles.outputArea}
                  value={explanationText}
                  onChange={(e) => setExplanationText(e.target.value)}
                  placeholder="Explanation ....."
                ></textarea>
              </div>
              
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addTestCaseButton}
                  onClick={() => update ? handleUpdateSample() :handleAddSample()}
                >
                  {update ? "Update Sample" : "Add Sample"}
                </button>
              </div> 

            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleTestCases;
