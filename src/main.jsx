import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Search from "./components/Search.jsx";
import Login from "./components/Login.jsx";
import Ratings from "./components/Ratings.jsx";
import Recommendations from "./components/Recommendations.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import Person from "./components/Person.jsx";
import Collection from "./components/Collection.jsx";
import DevInfo from "./components/DevInfo.jsx";

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
