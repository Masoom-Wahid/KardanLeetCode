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
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}questions/`, {
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

        console.log("data:", data);

        setChallenges(data || []);
        setTotalPages(data.available_pages || 1); // Adjust according to your API response

        // Move challenges.data log after setChallenges
        console.log("challenges.data:", challenges.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = challenges.data
    ? challenges.data.slice(indexOfFirstItem, indexOfLastItem)
    : Array.from({ length: itemsPerPage }, (_, index) => ({
        id: index + 1,
        title: `Challenge ${index + 1}`,
        lvl: `Level ${index + 1}`,
        point: Math.floor(Math.random() * 100) + 1,
        time_limit: `${Math.floor(Math.random() * 60) + 1} min`,
      }));

  console.log("challenges.data:", challenges.data);
  console.log("currentItems:", currentItems);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="contest challenges table">
          <ChallengeHeaderMolecule />
          {challenges.data && (
            <TableBody>
              {currentItems.map((challenge, index) => (
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