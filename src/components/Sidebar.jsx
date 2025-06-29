import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import NoOpinion from "../assets/NoOpinion.svg";
import ThumbsUp from "../assets/ThumbsUp.svg";
import ThumbsDown from "../assets/ThumbsDown.svg";
import TmdbLogo from "../assets/TmdbLogo.svg";
import api from "../apiFacade.js";

export default function Sidebar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    api.logout();
    setLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className={styles.sidebar}>
      <h1>
        <span style={{ color: "var(--green)" }}>MOVIE</span>
        <span style={{ color: "var(--lightblue)" }}>APP</span>
      </h1>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/ratings">Ratings</Link>
        <Link to="/recommendations">Recommendations</Link>
        {loggedIn ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/create-account">Create account</Link>
          </>
        )}
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={TmdbLogo} className={styles.tmdbLogo} alt="TMDB Logo" />
        </a>
        <p>
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}
