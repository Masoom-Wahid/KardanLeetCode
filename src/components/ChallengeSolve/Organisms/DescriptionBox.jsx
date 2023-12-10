import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// Custom styled Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  transition: "background-color 0.3s, transform 0.2s",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(188, 241, 249, 0.3)"
        : theme.palette.background.default, // Faint blue for light mode
    transform: "scale(1.05)",
  },

  "&.Mui-selected": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(188, 241, 249, 0.3)"
        : theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: "inset 0px -2px 4px rgba(0, 0, 0, 0.1)",
  },
}));

// Custom styled Paper component for a more creative look
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  background: theme.palette.background.paper,
  marginLeft: "-5px", // Shift the box to the left
  overflow: "hidden",
  borderColor: theme.palette.divider,
  borderWidth: "2px",
  borderStyle: "solid",
  transition: "box-shadow 0.3s, border-color 0.3s",
  "&:hover": {
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    borderColor: theme.palette.primary.main,
  },
}));

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#bcf1f9" },
      background: {
        default: mode === "light" ? "#fff" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
      },
    },
  });

// Custom styled Box for each example
const ExampleBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0px 5px 9px rgba(0, 0, 0, 0.15)",
  },
}));

const DescriptionBox = () => {
  const [tabValue, setTabValue] = useState(0);
  const [themeMode, setThemeMode] = useState("light");
  const theme = getTheme(themeMode);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleThemeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const problemDetails = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'.",
    examples: [
      {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
  };

  return (
    <StyledPaper elevation={5} sx={{ width: "50%", marginTop: "5px" }}>
      <Box sx={{ borderBottom: "1px solid #ccc" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <StyledTab label="Description" />
          <StyledTab label="Submissions" />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <Box
          sx={{
            p: 3,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            {problemDetails.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{ marginBottom: 3 }}
          >
            Difficulty: {problemDetails.difficulty}
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {problemDetails.description}
          </Typography>
          {problemDetails.examples.map((example) => (
            <ExampleBox key={example.id}>
              <Typography variant="body1" color="text.secondary" paragraph>
                <b>Example {example.id}:</b>
                <br />
                <span style={{ color: "#4caf50" }}>Input:</span> {example.input}
                <br />
                <span style={{ color: "#d32f2f" }}>Output:</span>{" "}
                {example.output}
                <br />
                <span style={{ color: "#1976d2" }}>Explanation:</span>{" "}
                {example.explanation}
              </Typography>
            </ExampleBox>
          ))}
        </Box>
      )}
    </StyledPaper>
  );
};

export default DescriptionBox;
