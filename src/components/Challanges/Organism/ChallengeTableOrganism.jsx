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
  const [totalPages, setTotalPages] = useState(1);

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
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Filter out the challenge with the deleted id
      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}questions?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChallenges(data.data || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
