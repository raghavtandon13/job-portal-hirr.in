import  { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./rsa.css";

const SavedPage = () => {
  function handleLogout() {
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    // return <Navigate to="/login" />;
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "ap-dark" : "ap-light";

  const token = getCookie("mytoken");

  const [jobs, setJobs] = useState([]);

  const apiUrl = "http://34.131.250.17/api/user/saved";

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
      <Navbar buttonLink="/profile" buttonLabel="Profile" button2Link="/user/applications" button2Label="Applications" funcBtnName="Logout" funcBtn={handleLogout} dropdownName={"Settings"} dropdown1="option #1" dropdown2="option #2" dropdown2Link="#" dropdown1Link="#" />
      <div className={`saved-wrapper ${theme}`}>
        <div style={{ width: "60vw" }} className="page-title">
          <h3>Your Saved Jobs</h3>
        </div>

        <div className="card-collection">
          {jobs.map((data) => (
            <Card key={data._id} data={data} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPage;
