import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import NoOpinion from "../assets/NoOpinion.svg";
import ThumbsUp from "../assets/ThumbsUp.svg";
import ThumbsDown from "../assets/ThumbsDown.svg";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>
        <span style={{ color: "#00d900" }}>MOVIE</span>
        <span style={{ color: "#056DFF" }}>APP</span>
      </h1>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/login">Login</Link>
        <Link to="/opinions">Opinions</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>
      <div>
        <p>How to rate:</p>
        <p>
          <img src={ThumbsUp} className={styles.opinionImage} />: Like
        </p>
        <p>
          <img src={ThumbsDown} className={styles.opinionImage} />: OK / dislike
        </p>
        <p>
          <img src={NoOpinion} className={styles.opinionImage} />: Not rated
        </p>
      </div>
    </div>
  );
}
