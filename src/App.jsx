// import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
// import Categories from "./Pages/Categories/Categories";
import Brand from "./Pages/Brand/Brand";
import Cart from "./Pages/Cart/Cart";
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProtectedRoutes> <HomePage /></ProtectedRoutes> },
        { path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: "brand", element: <ProtectedRoutes><Brand /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "products", element: <Products /> },
        { path: "/pdp/:id", element: <ProductDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}> </RouterProvider>
        </CounterContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
