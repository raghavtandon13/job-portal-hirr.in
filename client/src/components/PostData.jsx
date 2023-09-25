import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import "./PostData.css";

const PostData = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");

  const [jobs, setJobs] = useState([]);
  const [applicantImages, setApplicantImages] = useState({}); // Store applicant images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://34.131.250.17/api/company/jobs", {
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

  const fetchApplicantImages = async (jobId) => {
    try {
      const response = await fetch(
        `http://34.131.250.17/api/jobs/${jobId}/applicants`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      return data.map((applicant) => applicant.profilePicture);
    } catch (error) {
      console.error("Error fetching applicant images:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadApplicantImages = async () => {
      const imagesData = {};
      for (const job of jobs) {
        const images = await fetchApplicantImages(job._id);
        imagesData[job._id] = images;
      }
      setApplicantImages(imagesData);
    };

    loadApplicantImages();
  }, [jobs]);

  return (
    <div>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <div className="post-details">
              <Card isCompanyLoggedIn={true} key={job._id} data={job} />
              <div className="group">
                <div className="post-details-text">
                  <h3>{job.title}</h3>
                  <h4>Post Insights</h4>
                  <p>Applicants: {job.applicants.length}</p>
                  <div className="applicants-group">
                    {applicantImages[job._id]?.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Applicant ${index}`}
                        title={job.applicants[index]?.name} // Set the tooltip title
                      />
                    ))}
                  </div>
                </div>
                <div className="post-details-btn">
                  <Link to={`/org/jobs/${job._id}/applicants`}>
                    <button>See Applicants</button>
                  </Link>
                  <button>Remove Post</button>
                  <button>Edit Post</button>
                </div>
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
