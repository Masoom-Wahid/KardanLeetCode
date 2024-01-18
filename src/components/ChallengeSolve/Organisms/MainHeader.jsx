import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUpload,
  faChevronRight,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledComponentContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  overflow: "hidden",
  background: "linear-gradient(145deg, #e6faff, #bde4ff)",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(145deg, #bde4ff, #e6faff)",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.25)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff", // Color close to black
  textTransform: "none",
  fontWeight: 600,
  margin: "0 10px",
  padding: "8px 16px",
  borderRadius: "20px",
  background: "#0E43AB",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: theme.palette.primary.main,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
}));

const RectangleButton = styled(Button)(({ theme }) => ({
  height: "45px",
  padding: "0 20px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0E43AB",
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  fontWeight: 600,
  margin: "0 10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const BreathingIconButton = styled(IconButton)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.mode === "light" ? "#333" : "#f5f5f5",
  color: theme.palette.primary.contrastText,
  animation: "breathing 2s infinite",
  "@keyframes breathing": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "100%": { transform: "scale(1)" },
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#555" : "#ddd",
  },
}));

const MainHeader = ({ onToggleDarkMode, isDarkMode,onSubmit }) => {
  const navigate = useNavigate();
  const [runLoading,setRunLoading] = useState(false)

  const handleProblemList = () => {
    navigate("/challenges-list");
  };


  const handleRun = () => {
    setRunLoading(true)
    onSubmit("run")
    setRunLoading(false)
  }
  return (
    <StyledComponentContainer>
      <RectangleButton onClick={handleProblemList}>
        Problem List
        <FontAwesomeIcon icon={faChevronRight} />
      </RectangleButton>
      <Box>
        <StyledButton  onClick={() => handleRun()} startIcon={<FontAwesomeIcon icon={faPlay} />}>
          {runLoading ? "Running ..." : "Run"}  
        </StyledButton>
        <StyledButton onClick={() => onSubmit("submit")} startIcon={<FontAwesomeIcon icon={faUpload} />}>
          Submit
        </StyledButton>
      </Box>
      <BreathingIconButton onClick={onToggleDarkMode}>
        {isDarkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </BreathingIconButton>
    </StyledComponentContainer>
  );
};

export default MainHeader;
