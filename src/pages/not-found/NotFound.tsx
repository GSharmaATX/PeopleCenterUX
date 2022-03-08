import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import "./not-found.scss";

const NotFound = () => (
  <div className="not-found">
    <h1>
      <Typography variant="h2">Development in progress</Typography>
    </h1>
    <Link to="/">
      <Typography variant="h2">Go Home</Typography>
    </Link>
  </div>
);

export default NotFound;
