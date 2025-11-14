import { useState } from "react";
import api from "../apiFacade.js";
import formatAsString from "../formatAsString.js";
import styles from "./MovieListItem.module.css";
import NoRating from "../assets/NoRating.svg";
import GoodRating from "../assets/GoodRating.svg";
import OkRating from "../assets/OkRating.svg";
import NoPoster from "../assets/NoPoster.png";

export default function MovieListItem({ movieData, setActiveMovieId }) {
  const [rating, setRating] = useState(movieData.rating);

  let ratingImage;
  switch (rating) {
    case null:
      ratingImage = NoRating;
      break;
    case true:
      ratingImage = GoodRating;
      break;
    case false:
      ratingImage = OkRating;
      break;
  }

  function handleMovieListItemClick() {
    setActiveMovieId(movieData.id + "+" + Date.now());
  }

  function handlePosterImageClick(event) {
    event.stopPropagation();
    if (movieData.posterPath == null) {
      setActiveMovieId(null);
    } else {
      setActiveMovieId(movieData.posterPath + "+" + Date.now());
    }
  }

  function handleRatingImageClick(event) {
    event.stopPropagation();
    if (api.loggedIn() === false) {
      alert(api.getLoginEncouragement());
      return;
    }

    switch (rating) {
      case null:
        fetch(
          "https://movie.jcoder.dk/api/" + "movies/" + movieData.id,
          api.makeOptions("PUT", true, { rating: true })
        )
          .then((response) => {
            if (response.ok) {
              setRating(true);
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
              setRating(false);
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
              setRating(null);
            } else {
              alert("Error requesting server");
            }
          })
          .catch(() => alert("Error requesting server"));
        break;
    }
  }

  return (
    <>
      <hr className={styles.horizontalRule}></hr>
      <div className={styles.movieListItem} onClick={handleMovieListItemClick}>
        <img
          className={styles.posterImage}
          src={
            movieData.posterPath
              ? "https://image.tmdb.org/t/p/w154" + movieData.posterPath
              : NoPoster
          }
          onClick={handlePosterImageClick}
        />
        <div className={styles.title}>
          <div className={styles.ellipsis}>{movieData.title}</div>
        </div>
        <div className={styles.directors}>
          <div className={styles.ellipsis}>
            {formatAsString.directorsAsString(movieData.directors)}
          </div>
        </div>
        <div className={styles.genres}>
          <div className={styles.ellipsis}>
            {formatAsString.genresAsString(movieData.genres)}
          </div>
        </div>
        <div className={styles.year}>{movieData.releaseDate[0]}</div>
        <div className={styles.language}>{movieData.originalLanguage}</div>
        <div className={styles.score}>{movieData.voteAverage.toFixed(1)}</div>
        <img
          src={ratingImage}
          onClick={handleRatingImageClick}
          className={styles.ratingImage}
        />
      </div>
    </>
  );
}
