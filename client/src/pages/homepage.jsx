import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import LongBanner from "../components/longProfBanner";
import Search from "../components/search";
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
      <div className="wrapper">
        <LongBanner />
        <div className="search-wrapper">
          <Search />
        </div>
      </div>
    </>
  );
};

export default Homepage;
