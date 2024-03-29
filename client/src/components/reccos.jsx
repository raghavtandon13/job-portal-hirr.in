import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./reccos.css";

const Reccos = ({ desc, useApiUrl2 }) => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "r-dark" : "r-light";

  const [jobs, setJobs] = useState([]);

  const apiUrl1 = "https://hirrin-backend.vercel.app/api/user/saved";
  const apiUrl2 = "https://hirrin-backend.vercel.app/api/jobs/reccos";

  const apiUrl = useApiUrl2 ? apiUrl2 : apiUrl1;

  const savedUrl = "/user/saved";
  // const reccoUrl = "/user/reccos"; original
  const reccoUrl = "/home";

  const linkUrl = useApiUrl2 ? reccoUrl : savedUrl;
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setJobs(data);
        // console.log(jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className={`reccos ${theme}`}>
      <div className="reccos-brand">
        <h3>{desc}</h3>
        <Link to={linkUrl}>
          <button>See More&rarr;</button>
        </Link>
      </div>

      <div className="reccos-group">
        {jobs.slice(0, 3).map((job) => {
          const imageUrl = `https://hirrin-backend.vercel.app/api/static/uploads/${job.orgPicture}`;
          return (
            <div className="recc" key={job._id}>
              <div className="recc-pic">
                <img src={imageUrl} alt="" />
              </div>
              <div className="recc-txt">
                <Link to={`/job/${job._id}`}>
                  <p>{job.title}</p>
                </Link>
                <p>{job.companyName}</p>
                <p>Skills: {job.skills.join(", ")}</p>
                <p>Location: {job.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reccos;
