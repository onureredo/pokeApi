import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>ABOUT COMPONENT</h1>
      <Link to="/">Go back to Home here</Link>
      <br />
      <Link to="/pokemon">Go back to PokeFight here</Link>
      <br />
      <Link to="/history">Go back to History here</Link>
    </div>
  );
}

export default About;
