import { Outlet } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Logo from "./components/Logo.jsx";
import styles from "./AppTabletLayout.module.css";

export default function AppTabletLayout({
  loggedIn,
  setLoggedIn,
  setMenuIsOpen,
  modalIsOpen,
  setModalIsOpen,
  activeMovieId,
  setActiveMovieId,
  location,
}) {
  return (
    <div className={styles.tabletLayout}>
      <div>
        <Logo />
        <Menu
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
      <div className="outlet">
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
