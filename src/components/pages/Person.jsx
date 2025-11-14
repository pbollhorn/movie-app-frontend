import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import MovieList from "../MovieList.jsx";
import TmdbLink from "../TmdbLink.jsx";
import api from "../../apiFacade.js";

export default function Person() {
  const [personData, setPersonData] = useState(null);

  const { setActiveMovieId } = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    api
      .fetchData(`movies/person/${id}`, api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setPersonData(data);
      });
  }, []); // Runs on mount

  // Return early if no personData to show
  if (personData === null) {
    return <div></div>;
  }

  return (
    <>
      <h1>{personData.name}</h1>
      <TmdbLink text="Link to person on TMDB" path={`/person/${id}`} />
      <MovieList list={personData.movies} setActiveMovieId={setActiveMovieId} />
    </>
  );
}
