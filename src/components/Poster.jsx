import useDeviceType from "../hooks/useDeviceType.js";
import styles from "./Poster.module.css";

export default function Poster({ posterPath }) {
  const deviceType = useDeviceType();

  // Mobile and tablet view
  if (deviceType == "mobile" || deviceType == "tablet") {
    return (
      <div className={styles.posterMobileView}>
        <img src={"https://image.tmdb.org/t/p/w780" + posterPath} />
      </div>
    );
  }

  // Desktop view
  return (
    <div className={styles.posterDesktopView}>
      <img src={"https://image.tmdb.org/t/p/w780" + posterPath} />
    </div>
  );
}
