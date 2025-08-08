import useDeviceType from "../hooks/useDeviceType.js";

export default function DevInfo() {
  const deviceType = useDeviceType();

  const remInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  return (
    <div>
      <h1>Dev Info</h1>
      <h2>Display</h2>
      (Remember to reload after resizing)
      <br />
      <br />
      {"screen.width: " + screen.width + " px"}
      <br />
      {"screen.height: " + screen.height + " px"}
      <br />
      {"window.devicePixelRatio: " + window.devicePixelRatio}
      <br />
      {"window.innerWidth: " + window.innerWidth + " px"}
      <br />
      {"window.outerWidth: " + window.outerWidth + " px"}
      <br />
      {"window.innerHeight: " + window.innerHeight + " px"}
      <br />
      {"window.outerHeight: " + window.outerHeight + " px"}
      <br />
      {"1 rem: " + remInPx + " px"}
      <br />
      {"Device type: " + deviceType}
      <br />
    </div>
  );
}
