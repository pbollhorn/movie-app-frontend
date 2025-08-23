import { Link, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import TmdbLogo from "../assets/TmdbLogo.svg";
import api from "../apiFacade.js";
import TmdbLink from "./TmdbLink.jsx";

export default function Menu({ loggedIn, setLoggedIn, setMenuIsOpen }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    api.logout();
    setLoggedIn(false);
    navigate("/login");
    setMenuIsOpen(false);
  }

  return (
    <div className={styles.menu}>
      <nav>
        <Link to="/" onClick={() => setMenuIsOpen(false)}>
          Search
        </Link>
        <Link to="/ratings" onClick={() => setMenuIsOpen(false)}>
          Ratings
        </Link>
        <Link to="/recommendations" onClick={() => setMenuIsOpen(false)}>
          Recommendations
        </Link>
        {loggedIn ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuIsOpen(false)}>
              Login
            </Link>
            <Link to="/create-account" onClick={() => setMenuIsOpen(false)}>
              Create Account
            </Link>
          </>
        )}
      </nav>
      <div className={styles.tmdbAttribution}>
        <TmdbLink>
          <img src={TmdbLogo} alt="TMDB Logo" />
        </TmdbLink>
        <p>
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}
