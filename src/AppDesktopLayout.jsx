import { Outlet } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Logo from "./components/Logo.jsx";
import styles from "./AppDesktopLayout.module.css";

export default function AppDesktopLayout({
  loggedIn,
  setLoggedIn,
  setMenuIsOpen,
  setModalIsOpen,
  activeMovieId,
  setActiveMovieId,
  location,
}) {
  return (
    <div className={styles.desktopLayout}>
      <div>
        <Logo />
        <Menu
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
      <div className={styles.outlet}>
        <Outlet
          key={location.key}
          context={{
            loggedIn,
            setLoggedIn,
            setActiveMovieId,
          }}
        />
      </div>
      <MovieDetails
        key={activeMovieId}
        activeMovieId={activeMovieId}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}
