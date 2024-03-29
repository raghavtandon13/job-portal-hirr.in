import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import "./rsa.css";

const ReccoPage = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("mytoken");

  const [jobs, setJobs] = useState([]);

  const apiUrl = "https://hirrin-backend.vercel.app/api/jobs/search/";

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar buttonLink="/profile" buttonLabel="Profile" button2Link="/user/applications" button2Label="Applications" funcBtnName="Logout" dropdownName={"Settings"} dropdown1="option #1" dropdown2="option #2" />
      <div style={{ width: "60vw" }} className="page-title">
        <h3>Reccomendations for you</h3>
      </div>
      <div className="card-collection">
        {jobs.map((data) => (
          <Card key={data._id} data={data} />
        ))}
      </div>
    </>
  );
};

export default ReccoPage;
