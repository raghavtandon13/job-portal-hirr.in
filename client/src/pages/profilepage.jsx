import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import Resume from "../components/resume";

const Profilepage = () => {
  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Find Jobs"
        button2Link="/signup"
        button2Label="Settings"
      />
      <ProfileBanner />
      <Resume/>
    </>
  );
};

export default Profilepage;
