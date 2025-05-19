import api from "../apiFacade.js";

export default function OpenSearch() {
  // console.log(
  //   api.fetchData("movies/search-open?text=olsen", api.makeOptions("GET", true))
  // );

  fetchOpenSearch("hello");

  return (
    <>
      <h1>Open Search</h1>
    </>
  );
}

async function fetchOpenSearch(text) {
  const response = await fetch(
    "https://movie.jcoder.dk/api/movies/search-open?text=olsen"
  );
  const data = await response.json();
  console.log(data);

  return data;
}
