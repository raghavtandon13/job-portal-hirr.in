import React, { useState } from "react";
import "./makePost.css";

const MakePost = () => {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setcompanyName] = useState("");

  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("skills").value = "";

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { companyName, title, skills, experience };
    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2NGJlMmM5YzdlMzY0ZTIwYzAzYzc3MzQiLCJpYXQiOjE2OTAxOTU5MDN9.kEptQ1pjmb4-Y5DomDDxJGDsGgvcCvQL8pxHzIzs7PM",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log("Job posted succesfully");
      } else {
        console.error("Job posting failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="signup-box">
      <div className="signup-heading">
        <h1>Make a Job Post to recruit candidates</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signup-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Organization's Name "
            value={companyName}
            onChange={(e) => setcompanyName(e.target.value)}
          />
          <input
            type="text"
            id="title"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            id="skills"
            placeholder="Skills Required"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            type="number"
            id="experience"
            placeholder="Experience in number of years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="signup-button">
          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default MakePost;