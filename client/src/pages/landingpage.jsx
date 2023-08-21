import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Testimonials from "./testimonials";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar
        buttonLink="/login"
        buttonLabel="Login"
        button2Link="/signup"
        button2Label="Register"
        funcBtnName="About Us"
      />
      <Banner />
      <Testimonials />
      <Footer/>
    </>
  );
};

export default LandingPage;
