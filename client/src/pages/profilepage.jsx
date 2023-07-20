import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";

const Profilepage = () => {
  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Home"
        button2Link="/signup"
        button2Label="Settings"
      />
      <ProfileBanner />
    </>
  );
};

export default Profilepage;
