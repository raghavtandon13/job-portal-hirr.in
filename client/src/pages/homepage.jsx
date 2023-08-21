import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import LongBanner from "../components/longProfBanner";
import Search from "../components/search";
import ProfileMeter from "../components/profileMeter";
import Reccos from "../components/reccos";
import Footer from "../components/Footer";

import "./Homepage.css";

const Homepage = () => {
  const [showProfileReq, setShowProfileReq] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("mytoken");

  // Simulating API call for demonstration
  const checkProfileStatus = async () => {
    try {
      // Make your API call here and set showProfileReq based on the response
      const apiResponse = await fetch("http://localhost:3000/user/details", {
        method: "GET", // Adjust the method as needed
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
          // Include other headers if necessary
        },
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log(data.updateReqeust);
        setShowProfileReq(data.updateReqeust); // Fix the property name here
      } else {
        console.error("Error fetching API:", apiResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    checkProfileStatus();
  }, []);
  function handleLogout() {
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  return (
    <>
      {showProfileReq && (
        <div className="profile-req">
          <h3>
            <a href="/profile">Complete Your Profile Here !!</a>
          </h3>
          <button
            onClick={() => {
              setShowProfileReq(false);
            }}
          >
            x
          </button>
        </div>
      )}
      <Navbar
        buttonLink="/profile"
        buttonLabel="Profile"
        button2Link="/user/applications"
        button2Label="Applications"
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
      <Footer />
    </>
  );
};

export default Homepage;
