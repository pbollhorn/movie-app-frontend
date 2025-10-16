import { Outlet } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Logo from "./components/Logo.jsx";
import styles from "./AppMobileLayout.module.css";
import BurgerIcon from "./assets/BurgerIcon.svg";

export default function AppMobileLayout({
  loggedIn,
  setLoggedIn,
  menuIsOpen,
  setMenuIsOpen,
  modalIsOpen,
  setModalIsOpen,
  activeMovieId,
  setActiveMovieId,
  location,
}) {
  return (
    <div className={styles.mobileLayout}>
      <div>
        <Logo />
        <img src={BurgerIcon} onClick={() => setMenuIsOpen(!menuIsOpen)} />
        {menuIsOpen && (
          <Menu
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setMenuIsOpen={setMenuIsOpen}
          />
        )}
      </div>
      <div className={`${styles.theOutlet} outlet`}>
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
