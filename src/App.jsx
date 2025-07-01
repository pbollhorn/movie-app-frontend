import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import api from "./apiFacade.js";
import Modal from "./components/Modal/Modal.jsx";

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

  const [loggedIn, setLoggedIn] = useState(api.loggedIn());

  const [activeMovieId, setActiveMovieId] = useState(null);

  return (
    <>
      <div className={styles.app}>
        <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Outlet context={{ loggedIn, setLoggedIn, setActiveMovieId }} />
        <MovieDetails activeMovieId={activeMovieId} />
      </div>
      <Modal activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId}>
        <MovieDetails activeMovieId={activeMovieId} />
      </Modal>
    </>
  );
}
