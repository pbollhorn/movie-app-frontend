import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import TmdbLink from "./TmdbLink.jsx";
import api from "../apiFacade.js";


export default function Collection() {
  const [collectionData, setCollectionData] = useState(null);

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

  // Return early if no collectionData to show
  if (collectionData === null) {
    return <div></div>;
  }

  return (
    <>
      <h1>{collectionData.name}</h1>
      <TmdbLink text="Link to collection on TMDB" path={"/collection/" + id} />
      <MovieCardList
        list={collectionData.movies}
        setActiveMovieId={setActiveMovieId}
      />
    </>
  );
}
