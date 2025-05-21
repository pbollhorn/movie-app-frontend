import { useState, useEffect } from "react";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";

export default function Recommendations() {
  const [list, setList] = useState([]);

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/recommendations", api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <>
      <h1>Recommendations for me</h1>
      <MovieCardList list={list} />
    </>
  );
}
