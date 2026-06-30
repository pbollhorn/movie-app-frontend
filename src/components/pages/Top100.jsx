import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieList from "../MovieList.jsx";
import api from "../../apiFacade.js";

export default function Top100() {
  const [list, setList] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const { setActiveMovieId } = useOutletContext();

  const handleChange = (event) => {
    setSelectedGenreId(event.target.value);
  };

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/top100", api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <>
      <h1>Top 100 Movies</h1>

      <select value={selectedGenreId} onChange={handleChange}>
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
