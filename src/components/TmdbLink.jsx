import styles from "./TmdbLink.module.css";
import ExternalLinkIcon from "../assets/ExternalLinkIcon.svg";

export default function TmdbLink({ text, path = "" }) {
  return (
    <a
      href={"https://www.themoviedb.org" + path}
      target="_blank"
      className={styles.tmdbLink}
    >
      {text}
      <img src={ExternalLinkIcon} />
    </a>
  );
}
