import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Search from "./components/pages/Search.jsx";
import Login from "./components/pages/Login.jsx";
import Ratings from "./components/pages/Ratings.jsx";
import Recommendations from "./components/pages/Recommendations.jsx";
import CreateAccount from "./components/pages/CreateAccount.jsx";
import Person from "./components/pages/Person.jsx";
import Collection from "./components/pages/Collection.jsx";
import DevInfo from "./components/pages/DevInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Search /> },
      { path: "/ratings", element: <Ratings /> },
      { path: "/recommendations", element: <Recommendations /> },
      { path: "/login", element: <Login /> },
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/person/:id", element: <Person /> },
      { path: "/collection/:id", element: <Collection /> },
      { path: "/dev", element: <DevInfo /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
