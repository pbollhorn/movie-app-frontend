import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieList from "../MovieList.jsx";
import api from "../../apiFacade.js";

export default function Recommendations() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  // useEffect
  useEffect(() => {
    if (!api.loggedIn()) return;

    api
      .fetchData("movies/recommendations", api.makeOptions("GET", true))
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []); // Runs on mount

  return (
    <>
      <h1>Recommendations</h1>

      {api.loggedIn() ? (
        <>
          <p>Movies for you based on your ratings</p>
          <MovieList list={list} setActiveMovieId={setActiveMovieId} />
        </>
      ) : (
        <p>{api.getLoginEncouragement()}</p>
      )}
    </>
  );
}
