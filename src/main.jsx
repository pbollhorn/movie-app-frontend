import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import OpenSearch from "./components/OpenSearch.jsx";
import Opinions from "./components/Opinions.jsx";
import Recommendations from "./components/Recommendations.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <OpenSearch /> },
      {
        path: "/opinions",
        element: <Opinions />,
      },
      {
        path: "/recommendations",
        element: <Recommendations />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
