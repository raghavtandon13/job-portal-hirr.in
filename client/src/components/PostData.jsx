import React, { useEffect, useState } from "react";
import "./PostData.css";

const PostData = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    // Fetch data from the API using Fetch
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/company/jobs", {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2NGI1MDVlZWNkNmU3OTU2OTQ2NDNlYmMiLCJpYXQiOjE2OTAxOTE2MjN9.P8BlffK-8hF709VqAcyx9UipOF7OokonE5Kf-5fvAUI", // Replace 'your-auth-token' with the actual token
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
        {/* {jobs.map((job) => (
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
        ))} */}
      </ul>
    </div>
  );
};

export default PostData;
