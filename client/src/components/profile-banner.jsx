import React from "react";
import image from "../assets/user.png";
import "./profile-banner.css";

const ProfileBanner = () => {
  return (
    <>
      <div className="profile-banner">
        <div className="profile-left">
          <img src={image} alt="" />
        </div>
        <div className="profile-right">
          <div className="profile-name">
            <h1>Shawn Mendez</h1>
            <h3>Backend Developer</h3>
            <h4>at Google</h4>
          </div>
          <hr />
          <div className="profile-details">
            <div className="profile-details-left">
              <h4>New Delhi, India</h4>
              <h4>4 Year</h4>
              <h4>₹ 8,00,00</h4>
            </div>
            <div className="profile-details-right">
              <h4>9817264590</h4>
              <h4>user@raghav.com</h4>
              <h4>15 days of less notice</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
