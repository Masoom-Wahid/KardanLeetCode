import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";

const DescriptionBox = () => {
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: "50%",
        marginTop: "5px",
        textAlign: "left",
        borderRight: "1px solid #ccc",
        borderLeft: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Description" />
        <Tab label="Submissions" />
      </Tabs>
      {tabValue === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            {problemDetails.title}
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ display: "block", marginBottom: "16px" }}
          >
            Difficulty: {problemDetails.difficulty}
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {problemDetails.description}
          </Typography>
          {problemDetails.examples.map((example) => (
            <Box key={example.id}>
              <Typography variant="body1" color="text.primary" paragraph>
                <b>Example {example.id}:</b>
                <br />
                Input: {example.input}
                <br />
                Output: {example.output}
                <br />
                Explanation: {example.explanation}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {/* Submissions content goes here */}
    </Box>
  );
};

export default DescriptionBox;
