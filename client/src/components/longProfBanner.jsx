import React from "react";
import image from "../assets/profile-pic.jpg";
import "./longProfBanner.css";

const LongBanner = () => {
  return (
    <>
      <div className="long-banner">
        <div className="long-left">
          <img src={image} alt="" />
        </div>
        <div className="long-right">
          <div className="long-name">
            <h1>Shawn Mendez</h1>
            <h3>Backend Developer</h3>
            <h4>at Google</h4>
          </div>
          <hr />
          <div className="long-details">
            <div className="long-details-left">
              <h4>New Delhi, India</h4>
              <h4>4 Year</h4>
              <h4>₹ 8,00,00</h4>
            </div>
            {/* <hr /> */}
            <div className="long-details-right">
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

export default LongBanner;
