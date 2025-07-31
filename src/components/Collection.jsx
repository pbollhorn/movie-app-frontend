import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import TmdbLink from "./TmdbLink.jsx";

export default function Collection() {
  const [collectionData, setCollectionData] = useState({
    name: "",
    movies: [],
  });

  const { setActiveMovieId } = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    api
      .fetchData("movies/collection/" + id, api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setCollectionData(data);
      });
  }, []); // Runs on mount

  return (
    <div>
      <h1>{collectionData.name}</h1>
      <TmdbLink path={"/collection/" + id}>Link to collection on TMDB</TmdbLink>
      <MovieCardList
        list={collectionData.movies}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
}
