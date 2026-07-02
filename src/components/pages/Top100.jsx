import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import api from "../../apiFacade.js";
import MovieList from "../MovieList.jsx";

export default function Top100() {
  const [genreList, setGenreList] = useState(null);
  const [list, setList] = useState([]);
  const [params, setParams] = useSearchParams();
  const genreIdParam = params.get("genreId") || "";

  const { setActiveMovieId } = useOutletContext();

  // Fetch genreList on mount
  useEffect(() => {
    api.fetchData("genres", api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setGenreList(data);
    });
  }, []);

  // Fetch data automatically whenever the URL query parameter "genreId" changes
  useEffect(() => {
    const url = genreIdParam
      ? `movies/top100?genreId=${genreIdParam}`
      : "movies/top100";
    api.fetchData(url, api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setList(data);
    });
  }, [genreIdParam]);

  // Selecting a genre only updates the URL
  function handleGenreSelect(event) {
    const genreId = event.target.value;
    if (genreId) {
      setParams({ genreId: genreId });
    } else {
      setParams({});
    }
  }

  if (!genreList) {
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
        {genreList.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <MovieList
        list={list}
        showNumbers={true}
        setActiveMovieId={setActiveMovieId}
      />
    </>
  );
}
