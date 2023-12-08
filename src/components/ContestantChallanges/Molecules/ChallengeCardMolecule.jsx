import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as farStar,
  faStar as fasStar,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";

const logoBlue = "#1565c0";
const lightBlue = "#64b5f6";

const ChallengeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
  borderRadius: theme.shape.borderRadius,
}));

const ChallengeCardContent = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ChallengeInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "18px",
});

const SolveButton = styled(Button)({
  backgroundColor: logoBlue,
  color: "#fff",
  "&:hover": {
    backgroundColor: lightBlue,
  },
});

const ChallengeCardMolecule = ({ challenge }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ChallengeCard>
      <ChallengeCardContent>
        <ChallengeInfo>
          <Typography variant="h6" gutterBottom>
            {challenge.name}
          </Typography>
          <Typography variant="body2">
            <span style={{ color: lightBlue }}>Easy, Max Score: </span>
            {challenge.maxScore},{" "}
            <span style={{ color: lightBlue }}>Success Rate: </span>
            {challenge.successRate}
          </Typography>
          <Typography variant="body2">{challenge.description}</Typography>
        </ChallengeInfo>
        <div>
          <IconButton onClick={toggleFavorite}>
            <FontAwesomeIcon
              icon={isFavorite ? fasStar : farStar}
              color={isFavorite ? lightBlue : "gray"}
            />
          </IconButton>
          <SolveButton variant="contained">Solve Challenge</SolveButton>
        </div>
      </ChallengeCardContent>
    </ChallengeCard>
  );
};

export default ChallengeCardMolecule;
