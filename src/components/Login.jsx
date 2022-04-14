import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Button onClick={handleLogin} variant="contained">
      Log In
    </Button>
  );
};

export default Login;
