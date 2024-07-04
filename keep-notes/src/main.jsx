import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./index.css";
import "../node_modules/tailwindcss/tailwind.css";
import MainBody from "./components/MainBody.jsx";
import ReminderRoute from "./components/ReminderRoute.jsx";
import FocusMode from "./components/FocusMode.jsx";
import Login from "./components/Login.jsx";

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
      {
        path: "/focus",
        element: <FocusMode />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <DndProvider backend={HTML5Backend}>
    <RouterProvider router={router}></RouterProvider>
    </DndProvider>
  </React.StrictMode>
);
