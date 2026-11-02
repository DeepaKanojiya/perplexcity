import React, { useEffect } from "react";
import { router } from "./app.route";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hook/useAuth";



function App() {

  const {handleGetMe}  =  useAuth()

  useEffect(()=>{
    handleGetMe()
  },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
