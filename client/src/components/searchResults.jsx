import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./card";
import "./search.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [responseData, setResponseData] = useState([]);

  const fetchSearchResults = async () => {
    const experienceParam = queryParams.get("experience") || "";
    const skillsParam = queryParams.get("skills") || "";
    const titleParam = queryParams.get("title") || "";

    const apiUrl = `http://localhost:3000/jobs/search?experience=${experienceParam}&skills=${skillsParam}&title=${titleParam}`;

    // const apiUrl = `http://localhost:3000/jobs/search?experience=${queryParams.get(
    //   "experience"
    // )}&skills=${queryParams.get("skills")}&title=${queryParams.get("title")}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseData(responseData);
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [queryParams]); // Add queryParams as a dependency to trigger re-fetch on change

  return (
    <div className="card-container">
      {responseData.length === 0 ? (
        <p className="no-res">No results found.</p>
      ) : (
        responseData.map((item) => <Card key={item._id} data={item} />)
      )}
    </div>
  );
};

export default SearchResults;
