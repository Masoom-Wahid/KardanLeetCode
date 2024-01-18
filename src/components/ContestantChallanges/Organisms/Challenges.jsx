import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ChallengeCardMolecule from "../Molecules/ChallengeCardMolecule";
import { styled } from "@mui/material/styles";
import "./Challenges.scss";
import NavigationBar from "../../NavBar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
}));

const ChallengesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const BASE_URL = process.env.REACT_APP_API_URL
const ChallengesPage = () => {
  const [challengesData,setChallengesData] = useState([]);
  const [contestName,setContestName] = useState("Contest")

  const navigate = useNavigate();
  console.log(localStorage.getItem("accessToken"))
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}competition/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log(response.status);
          // 401 means unauthorized , so the user is either using an old token or is
          // either bypassing
          if (response.status === 401) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        setChallengesData(data.data);
        setContestName(data.name);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavigationBar />
      <ChallengesContainer>
        <Box className="challenges-page">
          <Box className="header-section">
            <Typography variant="h4" className="page-title">
              {contestName}
            </Typography>
            <Typography variant="subtitle1" className="page-info">
              Points: 0 | Rank: 126268
            </Typography>
          </Box>
        </Box>
        <div>
          {challengesData.map((challenge) => (
            <ChallengeCardMolecule key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </ChallengesContainer>
    </>
  );
};

export default ChallengesPage;
