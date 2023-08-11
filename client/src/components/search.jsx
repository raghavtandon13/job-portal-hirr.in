import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      experience,
      title,
      location,
    });

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="banner-search">
        <input
          type="text"
          placeholder="Skills / designations"
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
      </div>
    </>
  );
};

export default Search;
