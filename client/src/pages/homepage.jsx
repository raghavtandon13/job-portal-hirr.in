import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import LongBanner from "../components/longProfBanner";
import Search from "../components/search";
import ProfileMeter from "../components/profileMeter";
import Reccos from "../components/reccos";
import "./Homepage.css";

const Homepage = () => {
  function handleLogout() {
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar
        buttonLink="/profile"
        buttonLabel="Profile"
        button2Link=""
        button2Label="Saved Jobs"
        funcBtn={handleLogout}
        funcBtnName="Logout"
        dropdownName={"Settings"}
        dropdown1="option #1"
        dropdown2="option #2"
      />
      <Search />
      <div className="wrapper">
        <LongBanner />

        <div className="sub-wrapper">
          <ProfileMeter />
          <Reccos desc="Job Reccomendations for you" useApiUrl2={true} />
          <Reccos desc="Saved Jobs" />
        </div>
      </div>
    </>
  );
};

export default Homepage;
