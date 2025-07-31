import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import TmdbLink from "./TmdbLink.jsx";

export default function Person() {
  const [personData, setPersonData] = useState({ name: "", movies: [] });

  const { setActiveMovieId } = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/person/" + id, api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setPersonData(data);
      });
  }, []); // Runs on mount


  return (
    <div>
      <h1>{personData.name}</h1>
      <TmdbLink path={"/person/" + id}>Link to profile on TMDB</TmdbLink>
      <MovieCardList
        list={personData.movies}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
}
