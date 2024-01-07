// import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Login from "../components/login";
// import { useNavigate } from "react-router-dom";
// import { useLocation, Link } from "react-router-dom";

const Loginpage = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center" }}>
        <Navbar buttonLink="/" buttonLabel="Home" button2Link="/signup" button2Label="Register" />
        <Login />
      </div>
    </>
  );
};

export default Loginpage;
