import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import api from "../../apiFacade.js";
import MovieList from "../MovieList.jsx";

export default function Top100() {
  const [genres, setGenres] = useState(null);
  const [params, setParams] = useSearchParams();
  const genreIdParam = params.get("genreId") || "";
  const [movies, setMovies] = useState([]);
  const { setActiveMovieId } = useOutletContext();

  // Fetch genres on mount
  useEffect(() => {
    api.fetchData("genres", api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setGenres(data);
    });
  }, []);

  // Fetch movies whenever the URL query parameter "genreId" changes
  useEffect(() => {
    const url = genreIdParam
      ? `movies/top100?genreId=${genreIdParam}`
      : "movies/top100";
    api.fetchData(url, api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setMovies(data);
    });
  }, [genreIdParam]);

  // When a genre is seleceted in the drop down menu, the URL query parameter "genreId" is updated
  function handleGenreSelect(event) {
    const genreId = event.target.value;
    if (genreId) {
      setParams({ genreId: genreId });
    } else {
      setParams({});
    }
  }

  if (!genres) {
    return (
      <>
        <h1>Top 100 Movies</h1>
      </>
    );
  }

  return (
    <>
      <h1>Top 100 Movies</h1>

      <select value={genreIdParam} onChange={handleGenreSelect}>
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <MovieList
        list={movies}
        showNumbers={true}
        setActiveMovieId={setActiveMovieId}
      />
    </>
  );
}
