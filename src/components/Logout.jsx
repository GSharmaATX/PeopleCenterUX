import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    navigate("/");
    // Remove other logged in user items that are stored locally.
  };

  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};

export default Logout;
