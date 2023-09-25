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
  const [sortCriteria, setSortCriteria] = useState("default"); // Default sorting
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order
  const [selectedSortOption, setSelectedSortOption] = useState("default"); // Default sorting

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const fetchSearchResults = async () => {
    const experienceParam = queryParams.get("experience") || "";
    const skillsParam = queryParams.get("skills") || "";
    const titleParam = queryParams.get("title") || "";

    const resultsPerPage = 3; // number of results per page

    // const apiUrl = `http://34.131.250.17/api/jobs/search?experience=${experienceParam}&skills=${skillsParam}&title=${titleParam}&page=${currentPage}&limit=${resultsPerPage}`;
    // const apiUrl = `http://34.131.250.17/api/jobs/search?experience=${experienceParam}&skills=${skillsParam}&title=${titleParam}&page=${currentPage}&limit=${resultsPerPage}&sort=${sortCriteria}&order=${sortOrder}`;
    const apiUrl = `http://34.131.250.17/api/jobs/search?experience=${experienceParam}&skills=${skillsParam}&title=${titleParam}&page=${currentPage}&limit=${resultsPerPage}&sort=${selectedSortOption}&order=${sortOrder}`;

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

  // useEffect(() => {
  //   fetchSearchResults();
  // }, [queryParams.toString(), currentPage]);
  // useEffect(() => {
  //   fetchSearchResults();
  // }, [queryParams.toString(), currentPage, sortCriteria, sortOrder]);
  useEffect(() => {
    fetchSearchResults();
  }, [queryParams.toString(), currentPage, selectedSortOption, sortOrder]);

  return (
    <div>
      <div className="sorting">
        <label>Sort by:</label>
        <div>
          <input
            type="radio"
            id="default"
            value="default"
            checked={selectedSortOption === "default"}
            onChange={() => setSelectedSortOption("default")}
          />
          <label htmlFor="default">Reccomended</label>
        </div>
        <div>
          <input
            type="radio"
            id="rating"
            value="rating"
            checked={selectedSortOption === "rating"}
            onChange={() => setSelectedSortOption("rating")}
          />
          <label htmlFor="rating">Rating</label>
        </div>
        <div>
          <input
            type="radio"
            id="relevance"
            value="relevance"
            checked={selectedSortOption === "relevance"}
            onChange={() => setSelectedSortOption("relevance")}
          />
          <label htmlFor="relevance">Relevance</label>
        </div>
        <div>
          <input
            type="radio"
            id="datePosted"
            value="datePosted"
            checked={selectedSortOption === "datePosted"}
            onChange={() => setSelectedSortOption("datePosted")}
          />
          <label htmlFor="datePosted">Date Posted</label>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "▲ Ascending" : "▼ Descending"}
        </button>
      </div>

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
