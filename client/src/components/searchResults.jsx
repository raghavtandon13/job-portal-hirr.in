import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Card from "./card";
import "./search.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [responseData, setResponseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSearchResults = async () => {
    const experienceParam = queryParams.get("experience") || "";
    const skillsParam = queryParams.get("skills") || "";
    const titleParam = queryParams.get("title") || "";

    const resultsPerPage = 3; // number of results per page

    const apiUrl = `http://localhost:3000/jobs/search?experience=${experienceParam}&skills=${skillsParam}&title=${titleParam}&page=${currentPage}&limit=${resultsPerPage}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.totalResults);
        setResponseData(responseData.results);
        setTotalPages(Math.ceil(responseData.totalResults / resultsPerPage));
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [queryParams.toString(), currentPage]);

  return (
    <div>
      <div className="card-container">
        {responseData.length === 0 ? (
          <p className="no-res">No results found.</p>
        ) : (
          responseData.map((item) => <Card key={item._id} data={item} />)
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowBackIosNewIcon />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
