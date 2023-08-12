import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";

const ReccoPage = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("mytoken");

  const [jobs, setJobs] = useState([]);

  const apiUrl = "http://localhost:3000/jobs/search/";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {jobs.map((data) => (
          <Card key={data._id} data={data} />
        ))}
      </div>
    </>
  );
};

export default ReccoPage;
