import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";

export default function Opinions() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  // useEffect
  useEffect(() => {
    api.fetchData("movies", api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setList(data);
    });
  }, []); // Runs on mount

  return (
    <div>
      <h1>My Opinions</h1>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </div>
  );
}
