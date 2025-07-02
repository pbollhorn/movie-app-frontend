import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import TmdbLogo from "../assets/TmdbLogo.svg";
import api from "../apiFacade.js";
import TmdbLink from "./TmdbLink.jsx";

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
        <span style={{ color: "var(--movieapp-green)" }}>MOVIE</span>
        <span style={{ color: "var(--movieapp-lightblue)" }}>APP</span>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <TmdbLink>
          <img src={TmdbLogo} className={styles.tmdbLogo} alt="TMDB Logo" />
        </TmdbLink>
        <p>
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}
