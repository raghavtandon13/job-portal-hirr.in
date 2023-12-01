import React from "react";
import Navbar from "../components/navbar";
import MakePost from "../components/makePost";

const Makepostpage = () => {
  return (
    <>
      <Navbar buttonLink="/" buttonLabel="Settings" button2Link="/signup" button2Label="Profile" />
      <MakePost />
    </>
  );
};

export default Makepostpage;
