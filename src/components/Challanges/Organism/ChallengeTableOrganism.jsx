import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import ChallengeHeaderMolecule from "../Molecule/ChallengeHeaderMolecule";
import ChallengeRowMolecule from "../Molecule/ChallengeRowMolecule";
import { useNavigate } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_API_URL


const ChallengeTableOrganism = ({name}) => {
  const [challenges,setChallenges] = useState([])


  const navigate = useNavigate();


  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}questions/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is 
        // either bypassing 
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      /*
      Filter Out All Of The Challenges Except For The One We Are Deleting Right Now
      Idk If There Is  A Better Way , Probbably Is
      */
      setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== id)
      );
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}questions/?name=${name}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          console.log(response.status);
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setChallenges(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData(); // eslint-disable-next-line
  }, []);



  return (
    <TableContainer component={Paper}>
      <Table aria-label="contest challenges table">
        <ChallengeHeaderMolecule />
        <TableBody>
          {challenges.map((challenge, index) => (
            <ChallengeRowMolecule
              key={challenge.id}
              challenge={challenge}
              index={index}
              onDelete={HandleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChallengeTableOrganism;
