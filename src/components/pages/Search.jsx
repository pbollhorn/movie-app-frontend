import { useState, useEffect, useRef } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import api from "../../apiFacade.js";
import MovieList from "../MovieList.jsx";
import SearchIcon from "../../assets/SearchIcon.svg";

export default function Search() {
  const [list, setList] = useState([]);
  const titleRef = useRef(null);
  const [params, setParams] = useSearchParams();
  const titleParam = params.get("title") || "";

  const { setActiveMovieId } = useOutletContext();

  // Fetch data automatically whenever the URL query parameter "title" changes
  useEffect(() => {
    if (titleParam) {
      titleRef.current.value = titleParam;
      fetchSearch(titleParam).then((data) => setList(data));
    }
  }, [titleParam]);

  // Form submission only updates the URL
  function handleSearchSubmit(event) {
    event.preventDefault();
    const text = titleRef.current.value;
    if (text) {
      setParams({ title: text });
    } else {
      params.delete("title");
      setParams(params);
    }
  }

  return (
    <>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          ref={titleRef}
          defaultValue={titleParam}
          placeholder="Search by title"
        />
        <button type="submit">
          <img src={SearchIcon} style={{ height: "1rem" }} />
        </button>
      </form>
      <MovieList list={list} setActiveMovieId={setActiveMovieId} />
    </>
  );
}

async function fetchSearch(title) {
  const url = `https://movie.jcoder.dk/api/movies/search?title=${title}`;
  const response = await fetch(url, api.makeOptions("GET", true));
  const data = await response.json();
  console.log(data);
  return data;
}
