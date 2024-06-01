// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container} from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import WorkSpace from "./components/WorkSpace";

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="mt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workspace" element={<WorkSpace/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
