import React from "react";
import "./resume.css";

const Resume = () => {
  return (
    <>
      <div className="resume">
        <h1>RESUME</h1>
        <div className="resume-headline">
          <h4 className="title">Resume Headline</h4>
          <h4>Software Enggineer from San Fransico</h4>
        </div>
        <div className="resume-skills">
          <h4 className="title">Key Skills</h4>
          <div className="skills-group">
            <h4>Node.js</h4>
            <h4>React</h4>
            <h4>Express</h4>
            <h4>MERN</h4>
          </div>
        </div>
        <div className="resume-employment">
            <h4 className="title">Employment</h4>
          <div className="employment-group">
            <h4>Backend Developer</h4>
            <h4>Google</h4>
            <h4>Full-time Since 2021</h4>
          </div>
        </div>
        <div className="resume-education">
            <h4 className="title">Education</h4>
          <div className="education-group">
            <h4>B.Tech</h4>
            <h4>San Fran University</h4>
            <h4>Full time 2018-2021</h4>
          </div>
          <div className="education-group">
            <h4>Class XII</h4>
            <h4>San Fran Community Education</h4>
            <h4>2017</h4>
          </div>
        </div>
        <div className="resume-projects">
            <h4 className="title">Projects</h4>
          <div className="project-group">
            <h4>Social Sphere</h4>
            <h4>College Project</h4>
            <h4>May 2022 to Jun 2022</h4>
            <h4>A full stack social media platform made with MERN stack.</h4>
          </div>
          <div className="project-group">
            <h4>Style Savant</h4>
            <h4>College Project</h4>
            <h4>Apr 2022 to May 2022</h4>
            <h4>A modern and stylish fashion e-commerce website.</h4>
          </div>
        </div>
        <div className="resume-profiles">
            <h4 className="title">Online Profiles</h4>
            <div className="profile-group">
                <h4>Github</h4>
                <h4>https://github.com/wowowowow</h4>
            </div>
            <div className="profile-group">
                <h4>CodeChef</h4>
                <h4>https://codechef.com/wowowowow</h4>
            </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
