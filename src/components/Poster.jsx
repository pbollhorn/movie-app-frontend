import useLayoutType from "../hooks/useLayoutType.js";
import styles from "./Poster.module.css";

export default function Poster({ posterPath }) {
  const layoutType = useLayoutType();

  // Mobile and tablet layout
  if (layoutType == "mobile" || layoutType == "tablet") {
    return (
      <div className={styles.posterMobileView}>
        <img src={`https://image.tmdb.org/t/p/w780${posterPath}`} />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className={styles.posterDesktopView}>
      <img src={`https://image.tmdb.org/t/p/w780${posterPath}`} />
    </div>
  );
}
