import React from "react";
import { Typography, Paper, Button, Box, CssBaseline } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/system";
// import { keyframes } from "@emotion/react";

// Create a theme instance
const theme = createTheme({
  // If you have custom theme properties, define them here
});

// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

const StyledPaper = styled(Paper)({
  width: "100%",
  overflowX: "auto",
  margin: "20px auto",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  // animation: `${gradientAnimation} 30s ease infinite`,s
  // Additional styles can be added here
});

const Header = styled(Box)({
  textAlign: "center",
  padding: "120px 20px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  // Add your background image for the header
  backgroundImage: `url('/path-to-header-background.jpg')`,
});

const Section = styled(Box)({
  padding: "100px 0",
  color: "white",
  textAlign: "center",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[900],
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[800],
  },
  // Add background image for sections
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const StyledButton = styled(Button)({
  marginTop: "30px",
  padding: "10px 30px",
  fontSize: "1rem",
  borderRadius: "20px",
  // Additional styles can be added here
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />{" "}
      {/* This is for a consistent baseline style across browsers */}
      <Header>
        <Typography variant="h2" gutterBottom>
          Kardan Contest
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          The best and foremost programming contest in the country.
        </Typography>
        <StyledButton variant="contained" color="primary">
          Get Started
        </StyledButton>
      </Header>
      <Section
        style={{ backgroundImage: `url('/path-to-overview-background.jpg')` }}
      >
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1">The Overview</Typography>
        </StyledPaper>
      </Section>
      <Section
        style={{ backgroundImage: `url('/path-to-vision-background.jpg')` }}
      >
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Vision
          </Typography>
          <Typography variant="body1">The Vision</Typography>
        </StyledPaper>
      </Section>
    </ThemeProvider>
  );
};

export default Home;
