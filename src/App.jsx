// import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
// import Categories from "./Pages/Categories/Categories";
// import Brand from "./Pages/Brand/Brand";
// import Cart from "./Pages/Cart/Cart";
import CounterContextProvider from './contexts/counterContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <CounterContextProvider>
        <RouterProvider router={router}> </RouterProvider>
      </CounterContextProvider>
    </>
  );
}

export default App;
