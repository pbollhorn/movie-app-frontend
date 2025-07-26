import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import TmdbLink from "./TmdbLink.jsx";
import NoBackdrop from "../assets/NoBackdrop.png";
import formatAsString from "../formatAsString.js";

export default function MovieDetails({ activeMovieId }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fun = async () => {
      setMovieDetails(await fetchMovieDetails(activeMovieId));
    };
    if (activeMovieId) {
      fun();
    }
  }, [activeMovieId]);

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
        <p>TMDB score: {formatAsString.scoreAsString(movieDetails.score)}</p>
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
            <Link to={"/collection/" + movieDetails.collection.id}>
              {movieDetails.collection.name}
            </Link>
          </p>
        )}
        <h2>Directed by</h2>
        {directors.map((credit) => (
          <p>
            <Link key={credit.id} to={"/person/" + credit.personId}>
              {credit.name}
            </Link>
          </p>
        ))}
        <h2>Cast</h2>
        {cast.map((credit) => (
          <p key={credit.id}>
            <Link to={"/person/" + credit.personId}>{credit.name}</Link>
            {": " + credit.character}
          </p>
        ))}
        {usedDepartments.map((department) => (
          <>
            <h2 key={department}>{department}</h2>

            {movieDetails.credits
              .filter((credit) => credit.department === department)
              .map((credit) => (
                <p key={credit.id}>
                  <Link to={"/person/" + credit.personId}>{credit.name}</Link>
                  {": " + credit.job}
                </p>
              ))}
          </>
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
