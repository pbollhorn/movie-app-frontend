import { useState, useEffect } from "react";

// Custom hook for determining device type based on window size and standard font size
export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(determineDeviceType());

  useEffect(() => {
    function handleWindowResize() {
      setDeviceType(determineDeviceType());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return deviceType;
}

function determineDeviceType() {
  const windowInnerWidthInPx = window.innerWidth;
  const remInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const windowInnerWidthInRem = windowInnerWidthInPx / remInPx;

  if (windowInnerWidthInRem < 48) return "mobile";

  if (windowInnerWidthInRem < 58) return "tablet";

  return "desktop";
}
