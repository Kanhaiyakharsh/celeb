import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <h1>about</h1>,
      },
      {
        path: "/contact",
        element: <h1>contact</h1>,
      },
    ],
  },
]);

export default router;
