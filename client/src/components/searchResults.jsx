// SearchResults.jsx

import React, { useState, useEffect } from 'react';
import Card from './card'; // Import the Card component

const SearchResults = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend API and set the response in state
    const fetchDataFromBackend = async () => {
      try {
        const response = await fetch('/your-backend-api-url');
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromBackend();
  }, []); // Run the effect only once on component mount

  return (
    <div className="search-results">
      {/* Map through the responseData and render a Card for each JSON object */}
      {responseData.map((item) => (
        <Card key={item._id} data={item} />
      ))}
    </div>
  );
};

export default SearchResults;
