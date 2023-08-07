import React, { useState, useEffect } from "react";
import image from "../assets/user.png";
import "./longProfBanner.css";
import { Link } from "react-router-dom";

const LongBanner = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="long-banner">
        <div className="long-left">
          <img src={image || image} alt="" />
        </div>
        <div className="long-right">
          <div className="long-name">
            <Link to={"/profile"}>
              <h1>{userName}</h1>
            </Link>
            <h3>Backend Developer</h3>
            <h4>at Google</h4>
          </div>
          <hr />
          <div className="long-details">
            <div className="long-details-left">
              <h4>New Delhi, India</h4>
              <h4>4 Year</h4>
              <h4>₹ 8,00,00</h4>
            </div>
            {/* <hr /> */}
            <div className="long-details-right">
              <h4>9817264590</h4>
              <h4>user@raghav.com</h4>
              <h4>15 days of less notice</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LongBanner;
