import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Resume-Builder.css";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "rb-dark" : "rb-light";

  const [userSkills, setUserSkills] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [userHeadline, setUserHeadline] = useState("");
  const [userEmployment, setUserEmployment] = useState([]);
  const [userEducation, setUserEducation] = useState([]);

  const [skills, setSkills] = useState([{ skillName: "", experience: "" }]);
  const [projects, setProjects] = useState([{ title: "", duration: "", details: "" }]);
  const [profiles, setProfiles] = useState([{ websiteName: "", websiteLink: "" }]);
  const [headline, setHeadline] = useState("");
  const [education, setEducation] = useState([]);
  const [employment, setEmployment] = useState([]);

  const addSkillField = () => {
    setUserSkills([...userSkills, { skillName: "", experience: "" }]);
  };
  const addProjectField = () => {
    setUserProjects([...userProjects, { title: "", duration: "", details: "" }]);
  };
  const addProfileField = () => {
    setUserProfiles([...userProfiles, { websiteName: "", websiteLink: "" }]);
  };
  const addEmploymentField = () => {
    setUserEmployment([
      ...userEmployment,
      {
        currentlyEmployed: false,
        employmentType: "",
        totalExperience: "",
        currentCompany: "",
        joiningDate: null,
        salary: "",
        skillsRequired: [],
      },
    ]);
  };
  const addEducationField = () => {
    setUserEducation([
      ...userEducation,
      {
        educationType: "",
        course: "",
        university: "",
        courseType: "",
        duration: "",
      },
    ]);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://34.131.250.17/api/user/details", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Populate originally fetched data
          setUserSkills(data.resume.skills);
          setUserProjects(data.resume.projects);
          setUserProfiles(data.resume.onlineProfiles);
          setUserHeadline(data.resume.resumeHeadline);
          setUserEmployment(data.resume.employment);
          setUserEducation(data.resume.education);

          // Populate user input data with empty arrays initially
          setSkills([]);
          setProjects([]);
          setProfiles([]);
          setHeadline("");
          setEmployment([]);
          setEducation([]);
        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("An error occurred while fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [token]);

  //
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleExtractPdf = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch("http://34.131.250.17/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setExtractedText(data.extractedText);
      } else {
        console.error("PDF extraction failed.");
      }
    } catch (error) {
      console.error("An error occurred while extracting PDF:", error);
    }
  };

  //

  const sendDataToApi = async () => {
    const combinedSkills = [...userSkills, ...skills];
    const combinedProjects = [...userProjects, ...projects];
    const combinedProfiles = [...userProfiles, ...profiles];
    const combinedEmployment = [...userEmployment];
    const combinedEducation = [...userEducation];

    const data = {
      skills: combinedSkills,
      projects: combinedProjects,
      onlineProfiles: combinedProfiles,
      resumeHeadline: userHeadline,
      employment: combinedEmployment,
      education: combinedEducation,
    };

    try {
      const response = await fetch(`http://34.131.250.17/api/resume-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
        toast.success("Ressume updated successfully.", {
          onClose: () => {},
        });
        navigate("/profile");
      } else {
        console.error("Failed to send data to API.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  function handleLogout() {
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  return (
    <>
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
      <ProfileBanner showUpload={true} />
      <div className={`rb-con ${theme}`}>
        <div className="headline-box">
          <h3>Resume HeadLine</h3>
          <input
            type="text"
            value={userHeadline}
            placeholder="Headline"
            onChange={(e) => {
              const updatedHeadline = e.target.value;
              setUserHeadline(updatedHeadline);
            }}
          />
        </div>
        <hr />
        <div className="skills-box">
          <h3>Skills</h3>
          {userSkills.map((skill, index) => (
            <div key={index} className="skill">
              <input
                type="text"
                value={skill.skillName}
                placeholder="Skill Name"
                onChange={(e) => {
                  const updatedSkills = [...userSkills];
                  updatedSkills[index].skillName = e.target.value;
                  setUserSkills(updatedSkills);
                }}
              />
              <input
                type="number"
                value={skill.experience}
                placeholder="Experience (in years)"
                onChange={(e) => {
                  const updatedSkills = [...userSkills];
                  updatedSkills[index].experience = e.target.value;
                  setUserSkills(updatedSkills);
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
          {userProjects.map((project, index) => (
            <div key={index} className="project">
              <div className="project-input-group">
                <input
                  type="text"
                  value={project.title}
                  placeholder="Project Title"
                  onChange={(e) => {
                    const updatedProjects = [...userProjects];
                    updatedProjects[index].title = e.target.value;
                    setUserProjects(updatedProjects);
                  }}
                />
                <input
                  type="text"
                  value={project.duration}
                  placeholder="Duration"
                  onChange={(e) => {
                    const updatedProjects = [...userProjects];
                    updatedProjects[index].duration = e.target.value;
                    setUserProjects(updatedProjects);
                  }}
                />
              </div>
              <textarea
                value={project.details}
                placeholder="Details"
                onChange={(e) => {
                  const updatedProjects = [...userProjects];
                  updatedProjects[index].details = e.target.value;
                  setUserProjects(updatedProjects);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProjectField}>
            <AddIcon />
          </button>
        </div>
        <hr />
        <div className="online-profile-box">
          <h3>Online Profiles</h3>
          {userProfiles.map((profile, index) => (
            <div key={index} className="profile">
              <input
                type="text"
                value={profile.websiteName}
                placeholder="Profile Name"
                onChange={(e) => {
                  const updatedProfiles = [...userProfiles];
                  updatedProfiles[index].websiteName = e.target.value;
                  setUserProfiles(updatedProfiles);
                }}
              />
              <input
                type="url"
                value={profile.websiteLink}
                placeholder="Website Link"
                onChange={(e) => {
                  const updatedProfiles = [...userProfiles];
                  updatedProfiles[index].websiteLink = e.target.value;
                  setUserProfiles(updatedProfiles);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addProfileField}>
            <AddIcon />
          </button>
        </div>
        <hr />

        <div className="employment-box">
          <h3>Employment</h3>
          {userEmployment.map((employment, index) => (
            <div key={index} className="employment">
              <input
                type="checkbox"
                checked={employment.currentlyEmployed}
                onChange={(e) => {
                  const updatedEmployment = [...userEmployment];
                  updatedEmployment[index].currentlyEmployed = e.target.checked;
                  setUserEmployment(updatedEmployment);
                }}
              />
              <select
                value={employment.employmentType}
                onChange={(e) => {
                  const updatedEmployment = [...userEmployment];
                  updatedEmployment[index].employmentType = e.target.value;
                  setUserEmployment(updatedEmployment);
                }}
              >
                <option value="">Select Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
              <input
                type="number"
                value={employment.totalExperience}
                placeholder="Total Experience (in years)"
                onChange={(e) => {
                  const updatedEmployment = [...userEmployment];
                  updatedEmployment[index].totalExperience = e.target.value;
                  setUserEmployment(updatedEmployment);
                }}
              />
              <input
                type="text"
                value={employment.currentCompany}
                placeholder="Company Name"
                onChange={(e) => {
                  const updatedEmployment = [...userEmployment];
                  updatedEmployment[index].currentCompany = e.target.value;
                  setUserEmployment(updatedEmployment);
                }}
              />
              <div className="custom-date-input">
                <input
                  type="date"
                  placeholder="joining Date"
                  value={employment.joiningDate}
                  onChange={(e) => {
                    const updatedEmployment = [...userEmployment];
                    updatedEmployment[index].joiningDate = e.target.value;
                    setUserEmployment(updatedEmployment);
                  }}
                />
                <label>Joining Date</label>
              </div>
              <input
                type="number"
                value={employment.salary}
                placeholder="Salary"
                onChange={(e) => {
                  const updatedEmployment = [...userEmployment];
                  updatedEmployment[index].salary = e.target.value;
                  setUserEmployment(updatedEmployment);
                }}
              />
              {/* Add more input fields for other employment details */}
            </div>
          ))}
          <button className="add-btn" onClick={addEmploymentField}>
            <AddIcon />
          </button>
        </div>
        <hr />

        <div className="education-box">
          <h3>Education</h3>
          {userEducation.map((education, index) => (
            <div key={index} className="education">
              <select
                value={education.educationType}
                onChange={(e) => {
                  const updatedEducation = [...userEducation];
                  updatedEducation[index].educationType = e.target.value;
                  setUserEducation(updatedEducation);
                }}
              >
                <option value="">Select Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Correspondence">Correspondence</option>
              </select>
              <input
                type="text"
                value={education.course}
                placeholder="Course"
                onChange={(e) => {
                  const updatedEducation = [...userEducation];
                  updatedEducation[index].course = e.target.value;
                  setUserEducation(updatedEducation);
                }}
              />
              <input
                type="text"
                value={education.university}
                placeholder="University"
                onChange={(e) => {
                  const updatedEducation = [...userEducation];
                  updatedEducation[index].university = e.target.value;
                  setUserEducation(updatedEducation);
                }}
              />
              <input
                type="text"
                value={education.courseType}
                placeholder="Course Type"
                onChange={(e) => {
                  const updatedEducation = [...userEducation];
                  updatedEducation[index].courseType = e.target.value;
                  setUserEducation(updatedEducation);
                }}
              />
              <input
                type="number"
                value={education.duration}
                placeholder="Duration (in years)"
                onChange={(e) => {
                  const updatedEducation = [...userEducation];
                  updatedEducation[index].duration = e.target.value;
                  setUserEducation(updatedEducation);
                }}
              />
            </div>
          ))}
          <button className="add-btn" onClick={addEducationField}>
            <AddIcon />
          </button>
        </div>
        {/* <hr />
        <div className="pdf-upload-box">
          <h3>Upload PDF</h3>
          <input type="file" accept=".pdf" onChange={handlePdfUpload} />
          <button onClick={handleExtractPdf}>Extract Text</button>
        </div>
        {extractedText && (
          <div className="extracted-text">
            <h3>Extracted Text:</h3>
            <p>{extractedText}</p>
          </div>
        )} */}

        <button className="save-btn-2" onClick={sendDataToApi}>
          Save
        </button>
      </div>
    </>
  );
};

export default ResumeBuilder;
