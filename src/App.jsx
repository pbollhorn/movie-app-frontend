import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "./apiFacade.js";
import useLayoutType from "./hooks/useLayoutType.js";
import AppMobileLayout from "./AppMobileLayout.jsx";
import AppTabletLayout from "./AppTabletLayout.jsx";
import AppDesktopLayout from "./AppDesktopLayout.jsx";

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

  if (layoutType == "mobile") {
    return (
      <AppMobileLayout
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
        location={location}
      />
    );
  }

  if (layoutType == "tablet") {
    return (
      <AppTabletLayout
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setMenuIsOpen={setMenuIsOpen}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
        location={location}
      />
    );
  }

  return (
    <AppDesktopLayout
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      setMenuIsOpen={setMenuIsOpen}
      setModalIsOpen={setModalIsOpen}
      activeMovieId={activeMovieId}
      setActiveMovieId={setActiveMovieId}
      location={location}
    />
  );
}
