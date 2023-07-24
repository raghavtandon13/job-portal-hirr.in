import React, { useState } from "react";
import "./banner.css";

const Banner = ({ heading, subheading }) => {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const defaultHeading = "Find your dream job now";
  const defaultSubheading = "5 lakh+ jobs for you to explore";
  const handleSearch = async (e) => {
    console.log("button clicked");
    e.preventDefault();
    const apiUrl = `http://localhost:3000/jobs/search?experience=${experience}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log("Search successful!");
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
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
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};
Banner.defaultProps = {
  heading: "Find your dream job now",
  subheading: "5 lakh+ jobs for you to explore",
};
export default Banner;
