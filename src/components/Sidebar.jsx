import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>MOVIEAPP</h1>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/login">Login</Link>
        <Link to="/opinions">Opinions</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>
    </div>
  );
}
