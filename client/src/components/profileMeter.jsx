import React from "react";
import { useState,useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import "./profileMeter.css";

const ProfileMeter = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    // Fetch the profile completion percentage from the server
    async function fetchProfileCompletion() {
      try {
        const response = await fetch(
          "http://34.131.250.17/api/resume-completion",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${getCookie("mytoken")}`, // Include the token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPercentage(data.percentage);
        } else {
          console.error("Failed to fetch profile completion");
        }
      } catch (error) {
        console.error("Error fetching profile completion:", error);
      }
    }

    fetchProfileCompletion();
  }, []);
  return (
    <Link to="/resume-builder">
      <div className="profile-meter">
        <div className="meter-brand">
          <h3>Profile Completion Status</h3>
        </div>
        <div className="meter-heading">
          <h5>Complete you profile to stand out</h5>
        </div>
        <div className="meter-details">
          <div className="meter-percent" style={{ width: 100, height: 100 }}>
            {/* <CircularProgressbar value={percentage} text={`${percentage}%`} /> */}
            {percentage !== null ? (
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            ) : (
              <CircularProgressbar value={50} text="50%" />
            )}
          </div>
          <div className="meter-text">
            <p>Projects</p>
            <p>Video Introduction</p>
            <p>Education</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileMeter;
