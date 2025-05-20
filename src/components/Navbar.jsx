import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Search
      </Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>
        Login
      </Link>
      <Link to="/opinions" style={{ marginRight: "1rem" }}>
        My Opinions
      </Link>
      <Link to="/recommendations">My Recommendations</Link>
    </nav>
  );
}
