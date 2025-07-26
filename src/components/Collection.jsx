import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import TmdbLink from "./TmdbLink.jsx";

export default function Collection() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/collection/" + id, api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <div>
      <h1>Collection with id={id}</h1>
      <TmdbLink path={"/collection/" + id}>Link to collection on TMDB</TmdbLink>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </div>
  );
}
