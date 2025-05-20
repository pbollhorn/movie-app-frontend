import styles from "./MovieCard.module.css";
import NoOpinion from "../assets/NoOpinion.png";
import ThumbsUp from "../assets/ThumbsUp.png";
import ThumbsDown from "../assets/ThumbsDown.png";

export default function MovieCard({ movieData }) {
  const opinionPictures = [NoOpinion, ThumbsUp, ThumbsDown];

  function handleClick() {
    alert("hello " + movieData.id);
  }

  return (
    <div className={styles.movieCard}>
      <div>
        <img src={"https://image.tmdb.org/t/p/w500/" + movieData.posterPath} />
      </div>
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
      <div>
        <img src={opinionPictures[0]} onClick={handleClick} />
      </div>
    </div>
  );
}
