import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    const token = localStorage.getItem("token");
    return !!token;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="login" element={<Loginpage />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="signup/org" element={<OrgsignupPage />}></Route>
          <Route path="login/org" element={<Orgloginpage />}></Route>
          <Route path="org/home" element={<Orghomepage />}></Route>
          <Route path="org/makepost" element={<Makepostpage />}></Route>
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
