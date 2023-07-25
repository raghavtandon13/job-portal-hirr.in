import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import LongBanner from "../components/longProfBanner";
import Search from "../components/search";
import ProfileMeter from "../components/profileMeter";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <Navbar
        buttonLink="/login"
        buttonLabel="Applications"
        button2Link="/signup"
        button2Label="Settings"
      />
      <Search />
      <div className="wrapper">
        <LongBanner />

        <div className="sub-wrapper">
          <ProfileMeter />
        </div>
      </div>
    </>
  );
};

export default Homepage;
