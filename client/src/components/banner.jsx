import React from "react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-heading">
        <h1>Find your dream job now</h1>
        <p>5 lakh+ jobs for you to explore</p>
      </div>
      <div className="banner-search">
        <input type="text" placeholder="Enter skills/designations" />
        <input type="text" placeholder="Select Experience" />
        <input type="text" placeholder="Enter Location" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Banner;
