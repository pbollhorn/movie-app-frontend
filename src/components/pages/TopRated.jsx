import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieList from "../MovieList.jsx";
import api from "../../apiFacade.js";

export default function TopRated() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/top-rated", api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <>
      <h1>Top 100 Movies</h1>
      <MovieList list={list} setActiveMovieId={setActiveMovieId} />
    </>
  );
}