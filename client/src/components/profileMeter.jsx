import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import "./profileMeter.css";

const ProfileMeter = () => {
  const percentage = 88;
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
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
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
