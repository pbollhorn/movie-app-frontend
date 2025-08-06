import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Menu from "./components/Menu.jsx";
import { Outlet, useLocation } from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import api from "./apiFacade.js";
import Modal from "./components/Modal.jsx";
import Logo from "./assets/Logo.png";
import useWindowInnerWidthInRem from "./hooks/useWindowInnerWidthInRem.js";

export default function App() {
  // useEffect for setting dark/light mode according to browser settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
  }, []);

  const widthInRem = useWindowInnerWidthInRem();

  const [loggedIn, setLoggedIn] = useState(api.loggedIn());

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [activeMovieId, setActiveMovieId] = useState(null);

  // location.key is used as key for Outlet,
  // to make Outlet remount whenever a link is clicked,
  // also when already at that location
  const location = useLocation();

  // Mobile view
  if (widthInRem < 48) {
    return (
      <div className={styles.mobileView}>
        <div>
          <img src={Logo} style={{ height: "1.75rem" }} />
          <button onClick={() => setMenuIsOpen(!menuIsOpen)}>☰</button>
          {menuIsOpen && (
            <Menu
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setMenuIsOpen={setMenuIsOpen}
            />
          )}
        </div>
        <Outlet
          key={location.key}
          context={{
            loggedIn,
            setLoggedIn,
            setActiveMovieId,
          }}
        />
        <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <MovieDetails
            key={activeMovieId}
            activeMovieId={activeMovieId}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      </div>
    );
  }

  // Tablet view
  if (widthInRem < 58) {
    return (
      <div className={styles.tabletView}>
        <div>
          <img src={Logo} style={{ height: "1.75rem" }} />
          <Menu
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
        <Outlet
          key={location.key}
          context={{
            loggedIn,
            setLoggedIn,
            setActiveMovieId,
          }}
        />
        <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <MovieDetails
            key={activeMovieId}
            activeMovieId={activeMovieId}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      </div>
    );
  }

  // Desktop view
  return (
    <div className={styles.desktopView}>
      <div>
        <img src={Logo} style={{ height: "1.75rem" }} />
        <Menu
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
      <Outlet
        key={location.key}
        context={{
          loggedIn,
          setLoggedIn,
          setActiveMovieId,
        }}
      />
      <MovieDetails
        key={activeMovieId}
        activeMovieId={activeMovieId}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}
