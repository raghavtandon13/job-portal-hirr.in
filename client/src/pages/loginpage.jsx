import React from "react";
import Navbar from "../components/navbar";
import Login from "../components/login";

const Loginpage = () => {
  return (
    <>
      <Navbar buttonLink="/" buttonLabel="Home" />
      <Login />
    </>
  );
};

export default Loginpage;
