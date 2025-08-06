import { useState } from "react";
import styles from "./MovieCard.module.css";
import NoRating from "../assets/NoRating.svg";
import GoodRating from "../assets/GoodRating.svg";
import OkRating from "../assets/OkRating.svg";
import NoPoster from "../assets/NoPoster.png";
import api from "../apiFacade.js";
import formatAsString from "../formatAsString.js";

export default function MovieCard({
  movieData,
  setActiveMovieId,
  //setModalIsOpen,
}) {
  const [rating, setRating] = useState(movieData.rating);

  let ratingPic;
  switch (rating) {
    case null:
      ratingPic = NoRating;
      break;
    case true:
      ratingPic = GoodRating;
      break;
    case false:
      ratingPic = OkRating;
      break;
  }

  function handleMovieCardClick() {
    setActiveMovieId(movieData.id);
    //setModalIsOpen(true);
  }

  function handlePosterPicClick(event) {
    event.stopPropagation();
    setActiveMovieId(movieData.posterPath);
    //setModalIsOpen(true);
  }

  function handleRatingPicClick(event) {
    event.stopPropagation();
    if (api.loggedIn() === false) {
      alert("Login to rate movies and get recommendations");
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
    <div className={styles.movieCard} onClick={handleMovieCardClick}>
      <img
        src={
          movieData.posterPath
            ? "https://image.tmdb.org/t/p/w154" + movieData.posterPath
            : NoPoster
        }
        onClick={handlePosterPicClick}
        className={styles.posterImage}
      />
      <div>
        <p>
          <b>{movieData.title}</b>
        </p>
        <p>{formatAsString.directorsAsString(movieData.directors)}</p>
        <p>{formatAsString.genresAsString(movieData.genres)}</p>
        <p>
          {"" +
            movieData.releaseDate[0] +
            " " +
            movieData.originalLanguage +
            " " +
            formatAsString.scoreAsString(movieData.voteAverage) +
            "   "}
          <img
            src={ratingPic}
            onClick={handleRatingPicClick}
            className={styles.ratingImage}
          />
        </p>
      </div>
    </div>
  );
}
