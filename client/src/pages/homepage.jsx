import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/navbar";
// import ProfileBanner from "../components/profile-banner";
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

  const checkProfileStatus = async () => {
    try {
      const apiResponse = await fetch("http://34.131.250.17/api/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        // console.log(data.updateReqeust);
        setShowProfileReq(data.updateReqeust);
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
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  return (
    <>
      {showProfileReq && (
        <div className="profile-req">
          <h3>
            <a href="/resume-builder">Complete Your Profile Here !!</a>
          </h3>
          <button
            onClick={async () => {
              try {
                const response = await fetch("http://34.131.250.17/api/prof-req", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  // You can include any request body data here if needed
                  body: JSON.stringify({}),
                });

                if (response.ok) {
                  // Successful request, you can handle the response here if needed
                  // console.log("Profile request sent successfully");
                } else {
                  // Handle error response
                  console.error("Error sending profile request:", response.statusText);
                }
              } catch (error) {
                // Handle network error
                console.error("Error sending profile request:", error);
              }
              // After sending the request, you can hide the profile request div
              setShowProfileReq(false);
            }}
          >
            x
          </button>
        </div>
      )}
      <Navbar buttonLink="/profile" buttonLabel="Profile" button2Link="/user/applications" button2Label="Applications" funcBtn={handleLogout} funcBtnName="Logout" dropdownName={"Settings"} dropdown1="option #1" dropdown1Link="#" dropdown2="option #2" dropdown2Link="#" />
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
