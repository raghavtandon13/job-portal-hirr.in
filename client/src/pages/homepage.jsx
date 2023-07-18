import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
const Homepage = () => {
  return (
    <>
      <Navbar buttonLink="/login" buttonLabel="Login" button2Link="/signup" button2Label="Register"/>
      <Banner />
    </>
  );
};

export default Homepage;
