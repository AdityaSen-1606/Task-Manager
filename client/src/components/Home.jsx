import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "../assets/1699541412666.jpeg";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <Box className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Container>
        <Typography variant="h2" className="mb-6 font-bold text-center">
          Welcome to TaskMaster
        </Typography>
        <Typography variant="h5" className="mb-10 text-center">
          Organize your tasks, boost productivity, and achieve your goals
          effortlessly.
        </Typography>
        <Box display="flex" justifyContent="center" mb={8}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="mr-4"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="inherit" size="large">
            Learn More
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box flex={1} display="flex" justifyContent="center" p={2}>
            <img
              src={image}
              alt="Task Management"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </Box>
          <Box flex={1} p={2}>
            <Typography variant="h4" className="mb-4">
              Why TaskMaster?
            </Typography>
            <Typography variant="body1" className="mb-2">
              - Simplify your task management process.
            </Typography>
            <Typography variant="body1" className="mb-2">
              - Collaborate with your team in real-time.
            </Typography>
            <Typography variant="body1" className="mb-2">
              - Track your progress and stay organized.
            </Typography>
            <Typography variant="body1">
              - Achieve your goals efficiently and effectively.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
