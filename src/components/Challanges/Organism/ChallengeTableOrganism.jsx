import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import ChallengeHeaderMolecule from "../Molecule/ChallengeHeaderMolecule";
import ChallengeRowMolecule from "../Molecule/ChallengeRowMolecule";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const BASE_URL = process.env.REACT_APP_API_URL;

const ChallengeTableOrganism = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentItems, setCurrentItems] = useState([]);

  const navigate = useNavigate();

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}questions/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== id))

      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await fetch(`${BASE_URL}questions/?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setChallenges(data.data);
      setTotalPages(data.available_pages || 1);
      setCurrentItems(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChallenges([]); // Clear existing challenges when changing pages
    setCurrentPage(1); // Reset to the first page when changing pages
    fetchData(1); // Fetch data for the first page
    // eslint-disable-next-line
  }, []);

  //This is according to backend DO NOT CHANGE
  const itemsPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="contest challenges table">
          <ChallengeHeaderMolecule />
          {challenges && (
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
          )}
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ChallengeTableOrganism;