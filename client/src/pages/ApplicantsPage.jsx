import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import UserCard from "../components/UserCard";
import "./ApplicationsPage.css";

const ApplicantsPage = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("orgtoken");
  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://34.131.250.17/api/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
        // console.log(jobDetails.jobDescription);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    const fetchApplicantsWithAuthToken = async () => {
      try {
        const response = await fetch(`http://34.131.250.17/api/jobs/${jobId}/applicants`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchJobDetails();
    fetchApplicantsWithAuthToken();
  }, [jobId, token]);
  // console.log(applicants);
  return (
    <>
      <Navbar buttonLink="/profile" buttonLabel="Profile" button2Link="/user/applications" button2Label="Applications" funcBtnName="Logout" dropdownName={"Settings"} dropdown1="option #1" dropdown2="option #2" />

      <div className="wrapper-ap">
        {jobDetails && <Card data={jobDetails} isCompanyLoggedIn={true} />}

        {jobDetails && (
          <div className="job-desc">
            <h3>Job Description</h3>
            <p style={{ whiteSpace: "pre-line" }}>{jobDetails.jobDescription}</p>
          </div>
        )}
        <div className="applicants-list">
          <h3>Applicants</h3>
          {applicants.map((applicant) => (
            <UserCard key={applicant._id} data={applicant} /> // Assuming each applicant has a unique 'id' property
          ))}
        </div>
      </div>
    </>
  );
};
export default ApplicantsPage;
