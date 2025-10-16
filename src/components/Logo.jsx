import MovieAppLogo from "../assets/MovieAppLogo.svg";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <a href="/">
      <img src={MovieAppLogo} className={styles.movieAppLogo} />
    </a>
  );
}
