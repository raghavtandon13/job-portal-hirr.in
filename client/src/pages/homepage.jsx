import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import Search from "../components/search";

const Homepage = () => {
  return (
    <>
      <Navbar
        buttonLink="/login"
        buttonLabel="Login"
        button2Link="/signup"
        button2Label="Register"
      />
      {/* <ProfileBanner /> */}
      <Search/>
    </>
  );
};

export default Homepage;
