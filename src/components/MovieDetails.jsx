import { useState, useEffect } from "react";
import styles from "./MovieDetails.module.css";
import TmdbLink from "./TmdbLink.jsx";
import NoBackdrop from "../assets/NoBackdrop.png";
import {
  languageAsString,
  scoreAsString,
  dateAsString,
} from "../helperFunctions.js";

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
  const cast = movieDetails.credits.filter((c) => c.job === "Actor");
  const production = movieDetails.credits.filter(
    (c) => c.job !== "Actor" && c.job !== "Director"
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
          Original language: {languageAsString(movieDetails.originalLanguage)}
        </p>
        <p>Release date: {dateAsString(movieDetails.releaseDate)}</p>
        <p>TMDB score: {scoreAsString(movieDetails.score)}</p>
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

        <h2>Directed by</h2>
        {directors.map((credit) => (
          <p>
            <TmdbLink key={credit.id} path={"/person/" + credit.personId}>
              {credit.name}
            </TmdbLink>
          </p>
        ))}
        <h2>Cast</h2>
        <table>
          {cast.map((credit) => (
            <tr key={credit.id}>
              <td>
                <TmdbLink path={"/person/" + credit.personId}>
                  {credit.name}
                </TmdbLink>
              </td>
              <td>{credit.character}</td>
            </tr>
          ))}
        </table>
        <h2>Production</h2>
        {production.map((credit) => (
          <p key={credit.id}>
            <TmdbLink path={"/person/" + credit.personId}>
              {credit.name}
            </TmdbLink>
            : {credit.job}
          </p>
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
