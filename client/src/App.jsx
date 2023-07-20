import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Loginpage from "./pages/loginpage";
import SignUp from "./pages/signuppage";
import Profilepage from "./pages/profilepage";
import "./App.css";

function App() {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="login" element={<Loginpage />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route
            path="profile"
            element={isLoggedIn() ? <Profilepage /> : <Loginpage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
