import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";

export default function Recommendations() {
  const [list, setList] = useState([]);

  const { setActiveMovieId, setModalIsOpen } = useOutletContext();

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
    <div>
      <h1>Recommendations</h1>
      <p>Based on your ratings</p>
      <MovieCardList
        list={list}
        setActiveMovieId={setActiveMovieId}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}
