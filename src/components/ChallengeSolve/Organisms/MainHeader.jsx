import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./MainHeader.scss";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  const handleProblemList = () => {
    navigate("/challenges-list");
  };

  return (
    <div className="component-container">
      <Box
        sx={{
          marginTop: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "30px",
          width: "100%",
        }}
      >
        <Button variant="text" color="primary" onClick={handleProblemList}>
          Problem List
        </Button>
        <Box>
          <Button startIcon={<FontAwesomeIcon icon={faPlay} />} color="primary">
            Run
          </Button>
          <Button
            startIcon={<FontAwesomeIcon icon={faUpload} />}
            color="primary"
          >
            Submit
          </Button>
        </Box>
        <Box> {/* Placeholder for right-aligned content if any */} </Box>
      </Box>
    </div>
  );
};

export default MainHeader;
