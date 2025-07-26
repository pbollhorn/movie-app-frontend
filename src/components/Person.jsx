import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";

export default function Person() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/person/" + id, api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <div>
      <h1>Person with id={id}</h1>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </div>
  );
}
