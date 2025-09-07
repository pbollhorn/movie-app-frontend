import useLayoutType from "../hooks/useLayoutType.js";

export default function DevInfo() {
  const layoutType = useLayoutType();

  const remInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const windowInnerWidthInRem = window.innerWidth / remInPx;

  return (
    <>
      <h1>Dev Info</h1>
      <h2>Display</h2>
      (Remember to reload after resizing)
      <br />
      <br />
      {"screen.width: " + screen.width + " px"}
      <br />
      {"screen.height: " + screen.height + " px"}
      <br />
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
      <br />
      {"1 rem: " + remInPx + " px"}
      <br />
      {"window.innerWidth in rem: " + windowInnerWidthInRem}
      <br />
      {"Layout type: " + layoutType}
      <br />
    </>
  );
}
