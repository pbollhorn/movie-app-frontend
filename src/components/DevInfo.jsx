export default function DevInfo() {
  return (
    <div>
      {"screen.width: " + screen.width}
      <br />
      {"screen.height: " + screen.height}
      <br />
      {"window.devicePixelRatio: " + window.devicePixelRatio}
      <br />
      {"window.innerWidth: " + window.innerWidth}
      <br />
      {"window.outerWidth: " + window.outerWidth}
      <br />
      {"window.innerHeight: " + window.innerHeight}
      <br />
      {"window.outerHeight: " + window.outerHeight}
      <br />
    </div>
  );
}
