import { useState, useEffect } from "react";

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

  return (
    <div>
      <h1>Movie Details</h1>
      <h1>{movieDetails.title}</h1>
    </div>
  );
}

async function fetchMovieDetails(id) {
  const response = await fetch("https://movie.jcoder.dk/api/movies/" + id);
  const movieDetails = await response.json();
  console.log(movieDetails);
  return movieDetails;
}
