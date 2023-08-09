import React, { useState } from "react";
import Card from "./card";
import "./search.css";

const Search = () => {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [responseData, setResponseData] = useState([]);

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
        setResponseData(responseData); // Save the response data in state
        console.log("Search successful!");
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="banner-search">
        <input
          type="text"
          placeholder="Skills/designations"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Select Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Location"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {/* Render Card components for each item in the responseData */}
      </div>
      <div className="card-container">
        {responseData.map((item) => (
          <Card key={item._id} data={item} />
        ))}
      </div>
    </>
  );
};

export default Search;
