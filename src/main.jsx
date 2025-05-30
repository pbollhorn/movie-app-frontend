import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Search from "./components/Search.jsx";
import Login from "./components/Login.jsx";
import Ratings from "./components/Ratings.jsx";
import Recommendations from "./components/Recommendations.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Search /> },
      { path: "/login", element: <Login /> },
      { path: "/ratings", element: <Ratings /> },
      { path: "/recommendations", element: <Recommendations /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
