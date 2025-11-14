import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../apiFacade.js";
import MovieCardList from "../MovieCardList.jsx";
import SearchIcon from "../../assets/SearchIcon.svg";

export default function Search() {
  const [list, setList] = useState([]);
  const searchTitleRef = useRef(null);

  const { setActiveMovieId } = useOutletContext();

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const text = searchTitleRef.current.value;
    const data = await fetchSearch(text);
    console.log(data);
    setList(data);
  }

  return (
    <>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          ref={searchTitleRef}
          placeholder="Search by title"
        />
        <button type="submit">
          <img src={SearchIcon} style={{ height: "1rem" }} />
        </button>
      </form>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </>
  );
}

async function fetchSearch(title) {
  if (api.loggedIn()) {
    const response = await fetch(
      "https://movie.jcoder.dk/api/movies/search?title=" + title,
      api.makeOptions("GET", true)
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      "https://movie.jcoder.dk/api/movies/search?title=" + title
    );
    const data = await response.json();
    return data;
  }
}
