import React from "react";
import "./search.css"

const Search = () => {
  return (
    <div className="banner-search">
      <input type="text" placeholder="Enter skills/designations" />
      <input type="text" placeholder="Select Experience" />
      <input type="text" placeholder="Enter Location" />
      <button>Search</button>
    </div>
  );
};

export default Search;
