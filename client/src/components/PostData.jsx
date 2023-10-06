import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./card";
import Job from "../assets/job-posts.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostData.css";

const PostData = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applicantImages, setApplicantImages] = useState({});

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

  const handleDeletePost = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://34.131.250.17/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        toast.success("Job deleted successfully!", {
          onClose: () => {},
        });
        navigate(`/org/jobs/${jobId}`);
      } else {
        console.error("Error deleting job post");
      }
    } catch (error) {
      console.error("Error deleting job post:", error);
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
      {jobs.length === 0 ? (
        <div className="empty-job">
          <h2>You don't have any job posts...</h2>
          <img src={Job} alt="" />
        </div>
      ) : (
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
                      {applicantImages[job._id]
                        ?.slice(0, 4)
                        .map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`Applicant ${index}`}
                            title={job.applicants[index]?.name}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="post-details-btn">
                    <Link to={`/org/jobs/${job._id}/applicants`}>
                      <button>See Applicants</button>
                    </Link>
                    <button onClick={() => handleDeletePost(job._id)}>
                      Delete Post
                    </button>
                    <button>Edit Post</button>
                  </div>
                </div>
              </div>
              <hr className="post-end-break" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostData;
