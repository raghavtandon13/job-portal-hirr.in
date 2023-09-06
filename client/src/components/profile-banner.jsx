import React, { useState, useEffect } from "react";
import image from "../assets/user.png";
import "./profile-banner.css";

const ProfileBanner = ({ useNewApi , userId}) => {

  const originalApi = "http://localhost:3000/user/details";
  const newApi = "http://localhost:3000/user/:user/details";

  const apiEndpoint = useNewApi
    ? `http://localhost:3000/user/${userId}/details`
    : "http://localhost:3000/user/details";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = `${data.profilePicture}`;

          if (data.profilePicture && data.profilePicture.trim() !== "") {
            setUserImage(imageUrl);
          } else {
            setUserImage(image);
          }
          setUserName(data.name);
          setUserEmail(data.email);
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
      <div className="profile-banner">
        <div className="profile-left">
          <img src={userImage || image} alt="" />
        </div>
        <div className="profile-right">
          <div className="profile-name">
            <h1>{userName}</h1>
            <h3>Backend Developer</h3>
            <h4>at Google</h4>
          </div>
          <hr />
          <div className="profile-details">
            <div className="profile-details-left">
              <h4>New Delhi, India</h4>
              <h4>4 Year</h4>
              <h4>₹ 8,00,00</h4>
            </div>
            <div className="profile-details-right">
              <h4>9817264590</h4>
              <h4>{userEmail}</h4>
              <h4>15 days of less notice</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
