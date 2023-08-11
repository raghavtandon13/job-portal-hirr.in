import React, { useEffect, useState } from "react";
import "./reccos.css";

const Reccos = ({ desc, useApiUrl2 }) => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const [jobs, setJobs] = useState([]);

  const apiUrl1 = "http://localhost:3000/user/saved";
  const apiUrl2 = "http://localhost:3000/jobs/search";
  const apiUrl = useApiUrl2 ? apiUrl2 : apiUrl1;

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
      </div>
    </div>
  );
};

export default Reccos;
