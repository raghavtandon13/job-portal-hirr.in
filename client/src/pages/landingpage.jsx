import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
const LandingPage = () => {
  return (
    <>
      <Navbar
        buttonLink="/login"
        buttonLabel="Login"
        button2Link="/signup"
        button2Label="Register"
        funcBtnName="Legal"
      />
      <Banner />
    </>
  );
};

export default LandingPage;
