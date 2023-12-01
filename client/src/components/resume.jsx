import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./resume.css";

const Resume = ({ useNewApi, userId }) => {
  const [resumeData, setResumeData] = useState(null);
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "res-dark" : "res-light";

  const apiEndpoint = useNewApi ? `http://34.131.250.17/api/user/${userId}/details` : "http://34.131.250.17/api/user/details";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setResumeData(responseData.resume);
      } else {
        console.error("Failed to fetch resume data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      {resumeData ? (
        <div className={`resume ${theme}`}>
          <div className="resume-headline keep-together">
            <h4 className="title">Resume Headline</h4>
            <h4 className="name">{resumeData.resumeHeadline}</h4>
          </div>
          <div className="resume-skills keep-together">
            <h4 className="title">Key Skills</h4>
            <div className="skills-group">
              {resumeData.skills.map((skill, index) => (
                <h5 key={index}>{skill.skillName}</h5>
              ))}
            </div>
          </div>
          <div className="resume-employment keep-together">
            <h4 className="title">Employment</h4>
            {resumeData.employment.map((employment, index) => (
              <div className="employment-group" key={index}>
                <h4 className="name">{employment.employmentType.join(", ")}</h4>
                <h4>{employment.currentCompany}</h4>
                <h4>Working Since {new Date(employment.joiningDate).getFullYear()}</h4>
              </div>
            ))}
          </div>
          <div className="resume-education keep-together">
            <h4 className="title">Education</h4>
            {resumeData.education.map((education, index) => (
              <div className="education-group" key={index}>
                <h4 className="name">{education.course}</h4>
                <h4>{education.university}</h4>
                <h4>
                  {education.duration} {education.duration === 1 ? "year" : "years"}
                </h4>
              </div>
            ))}
          </div>
          <div className="resume-projects keep-together">
            <h4 className="title">Projects</h4>
            {resumeData.projects.map((project, index) => (
              <div className="project-group" key={index}>
                <h4 className="name">{project.title}</h4>
                <h4>College Project</h4>
                <h4>{project.duration} months</h4>
                <h4>{project.details}</h4>
              </div>
            ))}
          </div>
          <div className="resume-profiles keep-together">
            <h4 className="title">Online Profiles</h4>
            {resumeData.onlineProfiles.map((profile, index) => (
              <div className="profile-group" key={index}>
                <h4 className="name">{profile.websiteName}</h4>
                <h4>{profile.websiteLink}</h4>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Resume;
