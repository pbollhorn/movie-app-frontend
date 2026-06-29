import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import api from "./apiFacade.js";
import useLayoutType from "./hooks/useLayoutType.js";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Logo from "./components/Logo.jsx";
import styles from "./App.module.css";
import BurgerIcon from "./assets/BurgerIcon.svg";

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

  // CODE FOR STARTUP STARTS HERE ------------------------------------
  const [ready, setReady] = useState(false);

  // useEffect
  useEffect(() => {
    // api.fetchData("genres", api.makeOptions("GET", true)).then((data) => {
    //   console.log(data);
    //   setReady(true);
    // });
    // if (document.fonts) {
    //   document.fonts.ready.then(() => setReady(true));
    // } else {
    //   setReady(true);
    // }
    Promise.all([
      document.fonts.load("400 1em Inter"),
      document.fonts.load("700 1em Inter"),
    ]).then(() => setReady(true));
  }, []); // Runs on mount

  if (!ready) {
    return <></>;
  }
  // CODE FOR STARTUP ENDS HERE ------------------------------------

  /* ----------------------
        Mobile layout
   ---------------------- */
  if (layoutType == "mobile") {
    return (
      <div className={styles.mobileLayout}>
        <div className={styles.topbar}>
          <Logo />
          <img
            className={styles.burgerButton}
            src={BurgerIcon}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          />
          {menuIsOpen && (
            <Menu
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setMenuIsOpen={setMenuIsOpen}
            />
          )}
        </div>
        <div className={`${styles.outlet} theOutlet`}>
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

  /* ----------------------
        Tablet layout
   ---------------------- */
  if (layoutType == "tablet") {
    return (
      <div className={styles.tabletLayout}>
        <div className={styles.sidebar}>
          <Logo />
          <Menu
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
        <div className={`${styles.outlet} theOutlet`}>
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

  /* ----------------------
        Desktop layout
   ---------------------- */
  return (
    <div className={styles.desktopLayout}>
      <div className={styles.sidebar}>
        <Logo />
        <Menu
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
      <div className={`${styles.outlet} theOutlet`}>
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
