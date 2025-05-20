import styles from "./MovieCard.module.css";

export default function MovieCard({ movieData }) {
  return (
    <div className={styles.movieCard}>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movieData.posterPath}
      ></img>
      <div>
        <h1>{movieData.title}</h1>
        <h1>{movieData.originalTitle}</h1>
        <h1>
          {"" +
            movieData.releaseDate[0] +
            " Rating: " +
            movieData.rating +
            "/10"}
        </h1>
      </div>
    </div>
  );
}
