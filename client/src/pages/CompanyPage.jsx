import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import OrgProfile from "../components/OrgProfile";
import Card from "../components/card";
import "./companypage.css";

const CompanyPage = () => {
  const { companyId } = useParams();
  const [responseData, setResponseData] = useState([]);
  function handleLogout() {
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  const isLoggedIn = () => {
    const token = document.cookie.includes("orgtoken");
    // token && console.log(token, "present mytoken");
    return token;
  };
  const apiUrl = `http://34.131.250.17/api/jobs/${companyId}/all`;
  const fetchJobs = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseData(responseData);
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      {isLoggedIn() ? (
        <Navbar
          buttonLink="/org/home"
          buttonLabel="Home"
          button2Link="/org/profile"
          button2Label="Profile"
          funcBtnName="Logout"
          funcBtn={handleLogout}
          dropdownName={"Settings"}
          dropdown1="option #1"
          dropdown2="option #2"
          dropdown2Link="#"
          dropdown1Link="#"
        />
      ) : (
        <Navbar buttonLink="/login" buttonLabel="Login" button2Link="/signup" button2Label="Register" funcBtnName="About Us" />
      )}
      <div className="com-cont">
        <OrgProfile useNewApi={true} companyId={companyId} />
        <div className="card-container">
          {responseData.length === 0 ? <p className="no-res">No results found.</p> : responseData.map((item) => <Card key={item._id} data={item} />)}
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
