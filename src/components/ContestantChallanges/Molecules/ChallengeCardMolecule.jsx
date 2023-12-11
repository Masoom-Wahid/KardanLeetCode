import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const logoBlue = "#1565c0";
const lightBlue = "#64b5f6";

const ChallengeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.4s, box-shadow 0.4s",
  "&:hover": {
    transform: "translateY(-5px) scale(1.02)",
    boxShadow: theme.shadows[8],
  },
}));

const ChallengeCardContent = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  transition: "all 0.3s ease-in-out",
});

const ChallengeInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const SolveButton = styled(Button)({
  backgroundColor: logoBlue,
  color: "#fff",
  "&:hover": {
    backgroundColor: lightBlue,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  alignSelf: "start",
  marginTop: "12px",
});

const ChallengeCardMolecule = ({ challenge }) => {
  return (
    <ChallengeCard>
      <ChallengeCardContent>
        <ChallengeInfo>
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: "bold", color: "#0D47A1" }}
          >
            {challenge.name}
          </Typography>
          <Typography variant="body2" style={{ color: "#536D8A" }}>
            <span style={{ color: lightBlue }}>Easy, Max Score: </span>
            {challenge.maxScore},{" "}
            <span style={{ color: lightBlue }}>Success Rate: </span>
            {challenge.successRate}
          </Typography>
          <Typography variant="body2" style={{ color: "#536D8A" }}>
            {challenge.description}
          </Typography>
        </ChallengeInfo>
        <SolveButton variant="contained">Solve Challenge</SolveButton>
      </ChallengeCardContent>
    </ChallengeCard>
  );
};

export default ChallengeCardMolecule;
