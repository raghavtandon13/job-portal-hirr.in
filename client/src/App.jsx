import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Loginpage from "./pages/loginpage";
import SignUp from "./pages/signuppage";
import Profilepage from "./pages/profilepage";
import Homepage from "./pages/homepage";
import OrgsignupPage from "./pages/orgsignuppage";
import Orgloginpage from "./pages/orgloginpage";
import Orghomepage from "./pages/orghomepage";
import Makepostpage from "./pages/makepostpage";

import "./App.css";

function App() {
  const isLoggedIn = () => {
    const token = document.cookie.includes("mytoken");
    console.log(token);
    return token;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="org/signup" element={<OrgsignupPage />}></Route>
          <Route path="org/login" element={<Orgloginpage />}></Route>
          <Route path="org/home" element={<Orghomepage />}></Route>
          <Route path="org/makepost" element={<Makepostpage />}></Route>

          <Route
            path="login"
            element={isLoggedIn() ? <Navigate to={"/home"} /> : <Loginpage />}
          ></Route>

          <Route
            path="/"
            element={isLoggedIn() ? <Navigate to={"/home"} /> : <LandingPage />}
          ></Route>

          <Route
            path="/home"
            element={isLoggedIn() ? <Homepage /> : <Navigate to={"/"} />}
          ></Route>

          <Route
            path="profile"
            element={
              isLoggedIn() ? <Profilepage /> : <Navigate to={"/login"} />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
