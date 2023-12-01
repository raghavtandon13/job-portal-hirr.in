import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Reccos from "../components/reccos";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import "./jobdetailspage.css";

function JobDetails() {
  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState(null);

  function handleLogout() {
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "jd-dark" : "jd-light";

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://34.131.250.17/api/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
        console.log(jobDetails.jobDescription);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchJobDetails();
  }, [jobId]);

  const isLoggedIn = () => {
    const token = document.cookie.includes("mytoken");
    return token;
  };

  // Fetch job details using jobId from your backend (API call, database, etc.)

  return (
    <>
      {isLoggedIn() ? (
        <Navbar
          buttonLink="/profile"
          buttonLabel="Profile"
          button2Link="/user/applications"
          button2Label="Applications"
          funcBtnName="Logout"
          funcBtn={handleLogout}
          dropdownName={"Settings"}
          dropdown1="option #1"
          dropdown2="option #2"
          dropdown2Link="#"
          dropdown1Link="#"
        />
      ) : (
        <Navbar buttonLink="/login" buttonLabel="Login" button2Link="/signup" button2Label="Register" funcBtnName="About Us" />
      )}

      {jobDetails && <Card data={jobDetails} />}
      <div className={`like-div ${theme}`}>
        <h3>Rate This Recruiter</h3>
        <div className="like-btn-div">
          <ThumbUpOffAltIcon />
          <ThumbDownOffAltIcon />
        </div>
      </div>
      {jobDetails && (
        <div className={`job-desc ${theme}`}>
          <h3>Job Description</h3>
          <p style={{ whiteSpace: "pre-line" }}>{jobDetails.jobDescription}</p>
        </div>
      )}
      {jobDetails && (
        <div className={`random-div ${theme}`}>
          <Reccos desc={`More jobs from ${jobDetails.companyName}`} useApiUrl2={true} />
        </div>
      )}
    </>
  );
}

export default JobDetails;
