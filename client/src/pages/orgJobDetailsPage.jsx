import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Reccos from "../components/reccos";
import OrgChart from "../components/orgChart";
import "./jobdetailspage.css";

const OrgJobDetailsPage = () => {
  const viewsData = [10, 25, 40, 30, 50, 20];

  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
        console.log(jobDetails.jobDescription);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchJobDetails();
  }, [jobId]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("mytoken");

  // Fetch job details using jobId from your backend (API call, database, etc.)

  return (
    <>
      {token ? (
        <Navbar
          buttonLink="/profile"
          buttonLabel="Profile"
          button2Link="/user/applications"
          button2Label="Applications"
          funcBtnName="Logout"
          dropdownName={"Settings"}
          dropdown1="option #1"
          dropdown2="option #2"
        />
      ) : (
        <Navbar
          buttonLink="/login"
          buttonLabel="Posts"
          button2Link="/signup"
          button2Label="Profile"
          funcBtnName="About Us"
          dropdownName="Settings"
        />
      )}

      {jobDetails && <Card data={jobDetails} isCompanyLoggedIn={true} />}

      {jobDetails && (
        <div className="job-desc">
          <h3>Job Description</h3>
          <p style={{ whiteSpace: "pre-line" }}>{jobDetails.jobDescription}</p>
        </div>
      )}
      <OrgChart viewsData={viewsData} />
      {jobDetails && (
        <div className="random-div">
          <Reccos
            desc={`More jobs from ${jobDetails.companyName}`}
            useApiUrl2={true}
          />
        </div>
      )}
    </>
  );
};

export default OrgJobDetailsPage;
