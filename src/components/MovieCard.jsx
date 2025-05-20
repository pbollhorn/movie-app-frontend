import { useState } from "react";
import styles from "./MovieCard.module.css";
import NoOpinion from "../assets/NoOpinion.png";
import ThumbsUp from "../assets/ThumbsUp.png";
import ThumbsDown from "../assets/ThumbsDown.png";
import api from "../apiFacade.js";

export default function MovieCard({ movieData }) {
  const [opinion, setOpinion] = useState(movieData.likes);

  let opinionPic;
  switch (opinion) {
    case null:
      opinionPic = NoOpinion;
      break;
    case true:
      opinionPic = ThumbsUp;
      break;
    case false:
      opinionPic = ThumbsDown;
      break;
  }

  function clickOpinionPic() {
    switch (opinion) {
      case null:
        fetch(
          "https://movie.jcoder.dk/api/" + "movies/" + movieData.id,
          api.makeOptions("PUT", true, { rating: true })
        )
          .then((response) => {
            if (response.ok) {
              setOpinion(true);
            } else {
              alert("Error requesting server");
            }
          })
          .catch(() => alert("Error requesting server"));
        break;
      case true:
        fetch(
          "https://movie.jcoder.dk/api/" + "movies/" + movieData.id,
          api.makeOptions("PUT", true, { rating: false })
        )
          .then((response) => {
            if (response.ok) {
              setOpinion(false);
            } else {
              alert("Error requesting server");
            }
          })
          .catch(() => alert("Error requesting server"));
        break;
      case false:
        fetch(
          "https://movie.jcoder.dk/api/" + "movies/" + movieData.id,
          api.makeOptions("DELETE", true)
        )
          .then((response) => {
            if (response.ok) {
              setOpinion(null);
            } else {
              alert("Error requesting server");
            }
          })
          .catch(() => alert("Error requesting server"));
        break;
    }
  }

  return (
    <div className={styles.movieCard}>
      <div>
        <img src={"https://image.tmdb.org/t/p/w500" + movieData.posterPath} />
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
        <img src={opinionPic} onClick={clickOpinionPic} />
      </div>
    </div>
  );
}
