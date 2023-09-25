import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <Footer />
    </>
  );
};

export default LandingPage;
