import React from "react";
import Search from "./search";
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
      <Search />
    </div>
  );
};
Banner.defaultProps = {
  heading: "Find your dream job now",
  subheading: "5 lakh+ jobs for you to explore",
};
export default Banner;
