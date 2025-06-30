import "./TmdbLink.module.css";

export default function TmdbLink({ children, path = "" }) {
  return (
    <a href={"https://www.themoviedb.org" + path} target="_blank">
      {children}
    </a>
  );
}
