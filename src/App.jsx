import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Menu from "./components/Menu.jsx";
import { Outlet } from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import api from "./apiFacade.js";
import Modal from "./components/Modal/Modal.jsx";
import Logo from "./assets/Logo.png";
import useWindowWidth from "./hooks/useWindowWidth.js";

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

  const windowWidth = useWindowWidth();

  const [loggedIn, setLoggedIn] = useState(api.loggedIn());

  const [activeMovieId, setActiveMovieId] = useState(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Mobile view
  if (windowWidth < 768) {
    return (
      <div className={styles.mobileView}>
        <div>
          <img src={Logo} style={{ height: "1.75rem" }} />
          <button onClick={() => setMenuIsOpen(!menuIsOpen)}>☰</button>
          {menuIsOpen && <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        </div>
        <Outlet context={{ loggedIn, setLoggedIn, setActiveMovieId }} />
        <Modal
          activeMovieId={activeMovieId}
          setActiveMovieId={setActiveMovieId}
        >
          <MovieDetails activeMovieId={activeMovieId} />
        </Modal>
      </div>
    );
  }

  // Tablet view

  // Desktop view
  return (
    <div className={styles.desktopView}>
      <div>
        <img src={Logo} style={{ height: "1.75rem" }} />
        <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
      <Outlet context={{ loggedIn, setLoggedIn, setActiveMovieId }} />
      <MovieDetails activeMovieId={activeMovieId} />
    </div>
  );
}
