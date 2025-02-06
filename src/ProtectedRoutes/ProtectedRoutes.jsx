import React, { useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {

    const {isLoggedIn} = useContext(authContext)
    console.log("isLoggedIn Protected ", isLoggedIn);
    
  return (
    <>
    
      <h1>ProtectedRoutes</h1>
      
      {  isLoggedIn ? children : <Navigate to={"/login"}/>}

     
      
    </>
  );
}
