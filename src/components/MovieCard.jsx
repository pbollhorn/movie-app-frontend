import { useState } from "react";
import styles from "./MovieCard.module.css";
import NoOpinion from "../assets/NoOpinion.svg";
import ThumbsUp from "../assets/ThumbsUp.svg";
import ThumbsDown from "../assets/ThumbsDown.svg";
import NoPoster from "../assets/NoPoster.png";
import api from "../apiFacade.js";

export default function MovieCard({ movieData, setActiveMovieId }) {
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
    if (api.loggedIn() === false) {
      alert("Login to like movies and get recommendations");
      return;
    }

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
      <img
        src={
          movieData.posterPath
            ? "https://image.tmdb.org/t/p/w154" + movieData.posterPath
            : NoPoster
        }
        className={styles.posterImage}
        onClick={() => setActiveMovieId(movieData.id)}
      />
      <div>
        <p>
          <b>{movieData.title}</b> <em>{movieData.originalTitle!=movieData.title && movieData.originalTitle}</em>
        </p>
        <p>
          {movieData.genres[0] && movieData.genres[0]}, {movieData.genres[1] && movieData.genres[1]}, {movieData.genres[2] && movieData.genres[2]}
        </p>
        <p>
          {"" +
            movieData.releaseDate[0] +
            " " +
            movieData.originalLanguage +
            " " +
            ratingAsString(movieData.rating) +
            "   "}
          <img
            src={opinionPic}
            onClick={clickOpinionPic}
            className={styles.opinionImage}
          />
        </p>
      </div>
    </div>
  );
}

function ratingAsString(rating) {
  if (rating === null) {
    return "";
  }
  return rating.toFixed(1) + "/10";
}
