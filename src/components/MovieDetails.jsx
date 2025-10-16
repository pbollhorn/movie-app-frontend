import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Poster from "./Poster.jsx";
import TmdbLink from "./TmdbLink.jsx";
import formatAsString from "../formatAsString.js";
import styles from "./MovieDetails.module.css";
import NoBackdrop from "../assets/NoBackdrop.png";

// activeMovieId can be:
// - null
// - movieId+timeStamp, e.g. "85+1754489917403"
// - posterPath+timeStamp, e.g. "/ceG9VzoRAVGwivFU403Wc3AHRys.jpg+1754489917403"
export default function MovieDetails({ activeMovieId, setModalIsOpen }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Start by checking that activeMovieId is not null
    if (activeMovieId == null) return;

    const doTheFetch = async (movieId) => {
      setMovieDetails(await fetchMovieDetails(movieId));
    };

    // If activeMovieId does not contain '.' it means it is a movieId, and we fetch the movieDetails
    if (!activeMovieId.includes(".")) {
      const movieId = activeMovieId.split("+")[0];
      doTheFetch(movieId);
    }

    setModalIsOpen(true);
  }, [activeMovieId]);

  // If activeMovieId contains '.' it means it is a posterPath, and we return early just showing the poster
  if (activeMovieId != null && activeMovieId.includes(".")) {
    const posterPath = activeMovieId.split("+")[0];
    return <Poster posterPath={posterPath} />;
  }

  // Return early if no movieDetails to show
  if (movieDetails == null) {
    return <div className={styles.movieDetails}></div>;
  }

  const directors = movieDetails.credits.filter((c) => c.job === "Director");

  const cast = movieDetails.credits.filter((c) => c.department === "Cast");

  // List of all departments, excluding "Cast"
  const departments = [
    "Writing",
    "Production",
    "Directing",
    "Sound",
    "Art",
    "Costume & Make-Up",
    "Editing",
    "Lighting",
    "Camera",
    "Visual Effects",
    "Crew",
  ];

  const usedDepartments = departments.filter((department) =>
    movieDetails.credits.some((credit) => credit.department === department)
  );

  return (
    <div className={styles.movieDetails}>
      <img
        className={styles.backdropImage}
        src={
          movieDetails.backdropPath
            ? "https://image.tmdb.org/t/p/w780/" + movieDetails.backdropPath
            : NoBackdrop
        }
      />
      <div>
        <h1>{movieDetails.title}</h1>

        {movieDetails.genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}

        <p>Original title: {movieDetails.originalTitle}</p>
        <p>
          Original language:{" "}
          {formatAsString.languageAsString(movieDetails.originalLanguage)}
        </p>
        <p>Runtime: {formatAsString.runtimeAsString(movieDetails.runtime)}</p>
        <p>
          Release date: {formatAsString.dateAsString(movieDetails.releaseDate)}
        </p>
        <p>
          {"TMDB score: " +
            formatAsString.scoreAsString(movieDetails.voteAverage) +
            " (" +
            movieDetails.voteCount +
            " votes)"}
        </p>
        <p>
          <TmdbLink
            text="Link to movie on TMDB"
            path={"/movie/" + movieDetails.id}
          />
        </p>

        <p className={styles.overview}>{movieDetails.overview}</p>
        {movieDetails.collection && (
          <p>
            {formatAsString.collectionIntroAsString(
              movieDetails.collection.name
            )}
            <Link
              className={styles.internalLink}
              to={"/collection/" + movieDetails.collection.id}
              onClick={() => setModalIsOpen(false)}
            >
              {movieDetails.collection.name}
            </Link>
          </p>
        )}
        {directors.length > 0 && (
          <>
            <h2>Directed by</h2>
            {directors.map((credit) => (
              <p key={credit.id}>
                <Link
                  className={styles.internalLink}
                  to={"/person/" + credit.personId}
                  onClick={() => setModalIsOpen(false)}
                >
                  {credit.name}
                </Link>
              </p>
            ))}
          </>
        )}
        {cast.length > 0 && (
          <>
            <h2>Cast</h2>
            {cast.map((credit) => (
              <p key={credit.id}>
                <Link
                  className={styles.internalLink}
                  to={"/person/" + credit.personId}
                  onClick={() => setModalIsOpen(false)}
                >
                  {credit.name}
                </Link>
                {credit.character && ": " + credit.character}
              </p>
            ))}
          </>
        )}
        {usedDepartments.map((department) => (
          <Fragment key={department}>
            <h2>{department}</h2>
            {movieDetails.credits
              .filter((credit) => credit.department === department)
              .map((credit) => (
                <p key={credit.id}>
                  <Link
                    className={styles.internalLink}
                    to={"/person/" + credit.personId}
                    onClick={() => setModalIsOpen(false)}
                  >
                    {credit.name}
                  </Link>
                  {": " + credit.job}
                </p>
              ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

async function fetchMovieDetails(id) {
  const response = await fetch("https://movie.jcoder.dk/api/movies/" + id);
  const movieDetails = await response.json();
  console.log(movieDetails);
  return movieDetails;
}
