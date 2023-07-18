import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
const Homepage = () => {
  return (
    <>
      <Navbar buttonLink="/login" buttonLabel="Login" />
      <Banner />
    </>
  );
};

export default Homepage;
