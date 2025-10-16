import { useState, useEffect } from "react";

// Custom hook for determining layout type based on window size and standard font size
export default function useLayoutType() {
  const [layoutType, setLayoutType] = useState(determineLayoutType());

  useEffect(() => {
    function handleWindowResize() {
      setLayoutType(determineLayoutType());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return layoutType;
}

function determineLayoutType() {
  const windowInnerWidthInPx = window.innerWidth;
  const remInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const windowInnerWidthInRem = windowInnerWidthInPx / remInPx;

  if (windowInnerWidthInRem <= 42) return "mobile";

  if (windowInnerWidthInRem <= 66) return "tablet";

  return "desktop";
}
