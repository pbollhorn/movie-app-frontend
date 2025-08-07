import useDeviceType from "../hooks/useDeviceType.js";

export default function Poster({ posterPath }) {
  const deviceType = useDeviceType();

  // Mobile and tablet view
  if (deviceType == "mobile" || deviceType == "tablet") {
    return (
      <div style={{ width: "100%" }}>
        <img
          src={"https://image.tmdb.org/t/p/w780" + posterPath}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{ width: "100%" }}>
      <img
        src={"https://image.tmdb.org/t/p/w780" + posterPath}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
}
