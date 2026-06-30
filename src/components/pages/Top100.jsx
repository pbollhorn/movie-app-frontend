import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import api from "../../apiFacade.js";
import MovieList from "../MovieList.jsx";

export default function Top100() {
  const [list, setList] = useState([]);
  const [params, setParams] = useSearchParams();
  const genreIdParam = params.get("genreId") || "";

  const { setActiveMovieId } = useOutletContext();

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
      params.delete("genreId");
      setParams(params);
    }
  }

  return (
    <>
      <h1>Top 100 Movies</h1>

      <select value={genreIdParam} onChange={handleGenreSelect}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Sci-Fi</option>
        <option value="53">Thriller</option>
        <option value="10770">TV Movie</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>

      <MovieList
        list={list}
        showNumbers={true}
        setActiveMovieId={setActiveMovieId}
      />
    </>
  );
}
