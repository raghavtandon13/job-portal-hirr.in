import React, { useEffect, useState } from "react";
import "./PostData.css";

const PostData = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/company/jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <div className="post-details">
              <div className="post-details-text">
                <h3>{job.title}</h3>
                <p>Company: {job.companyName}</p>
                <p>Experience: {job.experience}</p>
                <p>Applicants: {job.applicants.length}</p>
              </div>
              <div className="post-details-btn">
                <button>See Apllicants</button>
                <button>Remove Post</button>
              </div>
            </div>
            <hr className="post-end-break" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostData;
