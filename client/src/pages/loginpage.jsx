import React from "react";
import Navbar from "../components/navbar";
import Login from "../components/login";

const Loginpage = () => {
  return (
    <>
      <Navbar buttonLink="/" buttonLabel="Home" button2Link="/signup" button2Label="Register"/>
      <Login />
    </>
  );
};

export default Loginpage;
