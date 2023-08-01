import React, { useEffect, useState } from "react";
import "./reccos.css";

const Reccos = ({ desc }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/saved", {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM4YWIwMzA1MTZmMWNhNjkyNWQxN2YiLCJpYXQiOjE2OTA4ODkyNDl9.a7i8NIZSDPOzQ9qdoVB9iXub6wUvlQRrNBv5DGTVfM4",
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
    <div className="reccos">
      <div className="reccos-brand">
        <h3>{desc}</h3>
      </div>

      <div className="reccos-group">
        {jobs.slice(0, 3).map((job) => (
          <div className="recc" key={job._id}>
            <p>{job.title}</p>
            <p>{job.companyName}</p>
            <p>Skills: {job.skills.join(", ")}</p>
          </div>
        ))}
        {jobs.slice(0, 3).map((job) => (
          <div className="recc" key={job._id}>
            <p>{job.title}</p>
            <p>{job.companyName}</p>
            <p>Skills: {job.skills.join(", ")}</p>
          </div>
        ))}
        {jobs.slice(0, 3).map((job) => (
          <div className="recc" key={job._id}>
            <p>{job.title}</p>
            <p>{job.companyName}</p>
            <p>Skills: {job.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reccos;
