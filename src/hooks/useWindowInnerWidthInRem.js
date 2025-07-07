import { useState, useEffect } from "react";

export default function useWindowInnerWidthInRem() {
  const [width, setWidth] = useState(windowInnerWidthInRem());

  function windowInnerWidthInRem() {
    const windowInnerWidthInPx = window.innerWidth;
    const remInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return windowInnerWidthInPx / remInPx;
  }

  useEffect(() => {
    function handleWindowResize() {
      setWidth(windowInnerWidthInRem());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
}
