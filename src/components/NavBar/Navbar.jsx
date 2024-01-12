// Importing React and necessary components from Material-UI, Emotion, and Font Awesome
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(#2196F3)",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 30s ease infinite`,
});

const FlexGrowBox = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
});

const IconsBox = styled(Box)({
  display: "flex",
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "white",
  letterSpacing: "0.05em",
  padding: "6px 12px",
  borderRadius: "6px",
  margin: "0 5px",
  transition: "all 0.3s ease-in-out, background-color 0.6s ease",
  "&:hover": {
    background: "rgba(0, 123, 255, 0.7)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    transform: "translateY(-2px)",
  },
}));

const LogoIcon = styled("img")({
  width: "50px",
  height: "50px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "rotate(20deg)",
  },
});

const IconButtonAnimated = styled(IconButton)({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#fff",
  },
});

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="logo"
          onClick={() => navigate("/")}
        >
          <LogoIcon src="/logo.png" alt="logo" />
        </IconButton>
        <FlexGrowBox>
          <Button onClick={() => navigate("/compete")}>
            <StyledTypography>My Score</StyledTypography>
          </Button>
          <Button onClick={() => navigate("/apply")}>
            <StyledTypography>Challenges</StyledTypography>
          </Button>
          <Button onClick={() => navigate("/apply")}>
            <StyledTypography>Competitions</StyledTypography>
          </Button>
        </FlexGrowBox>
        <IconsBox>
          <IconButtonAnimated onClick={() => {}}>
            <FontAwesomeIcon icon={faBell} />
          </IconButtonAnimated>
          <IconButtonAnimated onClick={() => {}}>
            <FontAwesomeIcon icon={faUser} />
          </IconButtonAnimated>
        </IconsBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
