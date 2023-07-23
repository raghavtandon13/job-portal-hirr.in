import React from "react";
import "./banner.css";

const Banner = ({ heading, subheading }) => {
  const defaultHeading = "Find your dream job now";
  const defaultSubheading = "5 lakh+ jobs for you to explore";
  return (
    <div className="banner">
      <div className="banner-heading">
      <h1>{heading || defaultHeading}</h1>
      <p>{subheading || defaultSubheading}</p>
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
Banner.defaultProps = {
  heading: "Find your dream job now",
  subheading: "5 lakh+ jobs for you to explore",
};
export default Banner;
