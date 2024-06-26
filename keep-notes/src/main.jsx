import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "../node_modules/tailwindcss/tailwind.css";
import MainBody from "./components/MainBody.jsx";
import ReminderRoute from "./components/ReminderRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/notes",
        element: <MainBody />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/reminder",
        element: <ReminderRoute />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
