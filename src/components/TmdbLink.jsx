export default function TmdbLink({ children, url }) {
  return (
    <a
      href={"https://www.themoviedb.org" + url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
