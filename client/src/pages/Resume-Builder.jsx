import React, { useState } from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import AddIcon from "@mui/icons-material/Add";
import "./Resume-Builder.css";

const ResumeBuilder = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");
  const [skills, setSkills] = useState([{ skillName: "", experience: "" }]);

  const [projects, setProjects] = useState([
    { title: "", duration: "", details: "" },
  ]);

  const [profiles, setProfiles] = useState([
    { websiteName: "", websiteLink: "" },
  ]);

  const addSkillField = () => {
    setSkills([...skills, { skillName: "", experience: "" }]);
  };

  const addProjectField = () => {
    setProjects([...projects, { title: "", duration: "", details: "" }]);
  };

  const addProfileField = () => {
    setProfiles([...profiles, { websiteName: "", websiteLink: "" }]);
  };

  const sendDataToApi = async () => {
    const filteredSkills = skills.filter(
      (skill) => skill.skillName.trim() !== "" && skill.experience.trim() !== ""
    );

    // Remove empty project entries
    const filteredProjects = projects.filter(
      (project) =>
        project.title.trim() !== "" &&
        project.duration.trim() !== "" &&
        project.details.trim() !== ""
    );

    // Remove empty profile entries
    const filteredProfiles = profiles.filter(
      (profile) =>
        profile.websiteName.trim() !== "" && profile.websiteLink.trim() !== ""
    );
    const data = {
      skills,
      projects,
      profiles,
    };

    try {
      const response = await fetch(`http://localhost:3000/resume-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Data sent successfully
        console.log("Data sent successfully!");
      } else {
        console.error("Failed to send data to API.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
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
      <ProfileBanner />
      <div className="rb-con">
        <div className="skills-box">
          <h3>Skills</h3>
          {skills.map((skill, index) => (
            <div key={index} className="skill">
              <input
                type="text"
                value={skill.skillName}
                placeholder="Skill Name"
                onChange={(e) => {
                  const updatedSkills = [...skills];
                  updatedSkills[index].skillName = e.target.value;
                  setSkills(updatedSkills);
                }}
              />
              <input
                type="number"
                value={skill.experience}
                placeholder="Experience (in years)"
                onChange={(e) => {
                  const updatedSkills = [...skills];
                  updatedSkills[index].experience = e.target.value;
                  setSkills(updatedSkills);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addSkillField}>
            <AddIcon />
          </button>
        </div>
        <hr />

        <div className="project-box">
          <h3>Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="project">
              <div className="project-input-group">
                <input
                  type="text"
                  value={project.title}
                  placeholder="Project Title"
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].title = e.target.value;
                    setProjects(updatedProjects);
                  }}
                />
                <input
                  type="text"
                  value={project.duration}
                  placeholder="Duration"
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].duration = e.target.value;
                    setProjects(updatedProjects);
                  }}
                />
              </div>
              <textarea
                value={project.details}
                placeholder="Details"
                onChange={(e) => {
                  const updatedProjects = [...projects];
                  updatedProjects[index].details = e.target.value;
                  setProjects(updatedProjects);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProjectField}>
            <AddIcon />
          </button>
        </div>
        <hr />

        <div className="education-box">
          <h3>Education</h3>
          {profiles.map((profile, index) => (
            <div key={index} className="profile">
              <input
                type="text"
                value={profile.websiteName}
                placeholder="Institute"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteName = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
              <input
                type="url"
                value={profile.websiteLink}
                placeholder="Year"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteLink = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProfileField}>
            <AddIcon />
          </button>
        </div>
        <hr />

        <div className="experience-box">
          <h3>Experience</h3>
          {profiles.map((profile, index) => (
            <div key={index} className="profile">
              <input
                type="text"
                value={profile.websiteName}
                placeholder="Organization"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteName = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
              <input
                type="url"
                value={profile.websiteLink}
                placeholder="Designation"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteLink = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProfileField}>
            <AddIcon />
          </button>
        </div>
        <hr />
        <div className="online-profile-box">
          <h3>Online Profiles</h3>
          {profiles.map((profile, index) => (
            <div key={index} className="profile">
              <input
                type="text"
                value={profile.websiteName}
                placeholder="Profile Name"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteName = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
              <input
                type="url"
                value={profile.websiteLink}
                placeholder="Website Link"
                onChange={(e) => {
                  const updatedProfiles = [...profiles];
                  updatedProfiles[index].websiteLink = e.target.value;
                  setProfiles(updatedProfiles);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProfileField}>
            <AddIcon />
          </button>
        </div>
        <button onClick={sendDataToApi}>Save</button>
      </div>
    </>
  );
};

export default ResumeBuilder;
