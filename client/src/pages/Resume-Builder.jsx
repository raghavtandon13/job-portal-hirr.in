import React, { useState } from "react";

const ResumeBuilder = () => {
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

  return (
    <div className="rb-con">
      <h2>Skills</h2>
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
            type="text"
            value={skill.experience}
            placeholder="Experience"
            onChange={(e) => {
              const updatedSkills = [...skills];
              updatedSkills[index].experience = e.target.value;
              setSkills(updatedSkills);
            }}
          />
        </div>
      ))}
      <button onClick={addSkillField}>Add Skill</button>

      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
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
      <button onClick={addProjectField}>Add Project</button>

      <h2>Online Profiles</h2>
      {profiles.map((profile, index) => (
        <div key={index} className="profile">
          <input
            type="text"
            value={profile.websiteName}
            placeholder="Website Name"
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
      <button onClick={addProfileField}>Add Profile</button>
    </div>
  );
};

export default ResumeBuilder;
