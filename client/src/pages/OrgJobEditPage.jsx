import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "./OrgJobEditPage.css";
import OrgProfile from "../components/OrgProfile";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrgJobEditPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");

  function handleLogout() {
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    // return <Navigate to="org/login" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      jobId,
      companyName,
      title,
      skills,
      experience,
      jobDescription,
      location,
    };
    try {
      const response = await fetch("https://hirrin-backend.vercel.app/api/job/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // const responseData = await response.json();
        toast.success("Job Edited successful!", {
          onClose: () => {},
        });
        navigate(`/org/jobs/${jobId}`);

        // console.log("Job posted succesfully");
      } else {
        console.error("Job posting failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`https://hirrin-backend.vercel.app/api/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
        setExperience(data.experience);
        setJobDescription(data.jobDescription);
        setSkills(data.skills);
        setTitle(data.title);
        setCompanyName(data.companyName);
        setLocation(data.location);
        // console.log(jobDetails.jobDescription);
        // console.log(jobDetails);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchJobDetails();
  }, [jobId]);
  return (
    <>
      <Navbar buttonLabel="Posts" button2Label="Profile" funcBtnName="Logout" dropdownName="Settings" dropdown1="option #1" dropdown1Link="#" dropdown2="option #2" dropdown2Link="#" funcBtn={handleLogout} />
      <OrgProfile />
      {jobDetails && (
        <div className="signup-box">
          <div className="signup-heading"></div>
          <form onSubmit={handleSubmit}>
            <div className="signup-input">
              <input type="text" name="name" id="name" placeholder="Enter Organization's Name " value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <input type="text" id="title" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" id="skills" placeholder="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} />

              <input type="number" id="experience" placeholder="Experience in number of years" value={experience} onChange={(e) => setExperience(e.target.value)} />
              <input type="text" id="location" placeholder="Location of work" value={location} onChange={(e) => setLocation(e.target.value)} />
              {/* Job Description Textarea */}
              <textarea id="jobDescription" placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            </div>
            <div className="signup-button">
              <button type="submit">Submit</button>
              {/* <button onClick={handleReset}>Reset</button> */}
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
};

export default OrgJobEditPage;
