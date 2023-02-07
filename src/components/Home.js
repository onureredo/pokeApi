import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>HOME COMPONENT</h1>
      <Link to="/pokemon">PokeFight Arena</Link>
      <br />
      <Link to="/history">History</Link>
      <br />
      {/* <Link to="/redirect">redirect</Link> 
      <br />*/}
      <Link to="/about">About Us</Link>
    </div>
  );
}
