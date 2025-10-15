import { useState } from "react";
import styles from "./App.module.css";
import Menu from "./components/Menu.jsx";
import { Outlet, useLocation, Link } from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import api from "./apiFacade.js";
import Modal from "./components/Modal.jsx";
import MovieAppLogo from "./assets/MovieAppLogo.svg";
import BurgerIcon from "./assets/BurgerIcon.svg";
import useLayoutType from "./hooks/useLayoutType.js";

export default function App() {
  const layoutType = useLayoutType();

  const [loggedIn, setLoggedIn] = useState(api.loggedIn());

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [activeMovieId, setActiveMovieId] = useState(null); // TODO: Rename to reflect it can also hold a posterPath

  // location.key is used as key for Outlet,
  // to make Outlet remount whenever a link is clicked,
  // also when already at that location
  const location = useLocation();

  // Mobile layout
  if (layoutType == "mobile") {
    return (
      <div className={styles.mobileLayout}>
        <div>
          <Link to="/" onClick={() => setMenuIsOpen(false)}>
            <img src={MovieAppLogo} className={styles.movieAppLogo} />
          </Link>
          <img src={BurgerIcon} onClick={() => setMenuIsOpen(!menuIsOpen)} />
          {menuIsOpen && (
            <Menu
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setMenuIsOpen={setMenuIsOpen}
            />
          )}
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
          <div className={styles.bottomSpacing}></div>
        </div>
        <Modal
          key={activeMovieId}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        >
          <MovieDetails
            activeMovieId={activeMovieId}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      </div>
    );
  }

  // Tablet layout
  if (layoutType == "tablet") {
    return (
      <div className={styles.tabletLayout}>
        <div>
          <Link to="/" onClick={() => setMenuIsOpen(false)}>
            <img src={MovieAppLogo} className={styles.movieAppLogo} />
          </Link>
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
        <Modal
          key={activeMovieId}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        >
          <MovieDetails
            activeMovieId={activeMovieId}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      </div>
    );
  }

  // Laptop layout
  if (layoutType == "laptop") {
    return (
      <div className={styles.laptopLayout}>
        <div>
          <Link to="/" onClick={() => setMenuIsOpen(false)}>
            <img src={MovieAppLogo} className={styles.movieAppLogo} />
          </Link>
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

  // Desktop layout
  return (
    <div className={styles.desktopLayout}>
      <div>
        <Link to="/" onClick={() => setMenuIsOpen(false)}>
          <img src={MovieAppLogo} className={styles.movieAppLogo} />
        </Link>
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
