import React from "react";
import { Link } from "react-router-dom";

function Something() {
  return (
    <div>
      <h1>HISTORY COMPONENT</h1>
      <br />
      <Link to="/">go back to Home</Link>
    </div>
  );
}

export default Something;
