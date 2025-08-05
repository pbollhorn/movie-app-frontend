import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import TmdbLink from "./TmdbLink.jsx";
import NoBackdrop from "../assets/NoBackdrop.png";
import formatAsString from "../formatAsString.js";

export default function MovieDetails({ activeMovieId, setModalIsOpen }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fun = async () => {
      setMovieDetails(await fetchMovieDetails(activeMovieId));
    };
    if (activeMovieId && Number.isInteger(activeMovieId)) {
      fun();
    }
  }, [activeMovieId]);

  // Display poster if activeMovieId is not an integer
  if (activeMovieId && !Number.isInteger(activeMovieId)) {
    return (
      <div>
        <img src={"https://image.tmdb.org/t/p/w154" + activeMovieId} />
      </div>
    );
  }

  // Return early if no movieDetails to show
  if (movieDetails === null) {
    return <div></div>;
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
        src={
          movieDetails.backdropPath
            ? "https://image.tmdb.org/t/p/w780/" + movieDetails.backdropPath
            : NoBackdrop
        }
      />
      <div>
        <h1>{movieDetails.title}</h1>
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
          <TmdbLink path={"/movie/" + movieDetails.id}>
            Link to movie on TMDB
          </TmdbLink>
        </p>
        <p>{movieDetails.genres[0] && movieDetails.genres[0]}</p>
        <p>{movieDetails.genres[1] && movieDetails.genres[1]}</p>
        <p>{movieDetails.genres[2] && movieDetails.genres[2]}</p>
        <p>{movieDetails.genres[3] && movieDetails.genres[3]}</p>
        <p>{movieDetails.genres[4] && movieDetails.genres[4]}</p>
        <p>{movieDetails.genres[5] && movieDetails.genres[5]}</p>
        <p>{movieDetails.overview}</p>
        {movieDetails.collection && (
          <p>
            Part of the{" "}
            <Link
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
                  to={"/person/" + credit.personId}
                  onClick={() => setModalIsOpen(false)}
                >
                  {credit.name}
                </Link>
                {": " + credit.character}
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
