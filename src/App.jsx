import { useEffect } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  // useEffect for setting dark/light mode according to browser settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
