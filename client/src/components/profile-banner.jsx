import React, { useState, useEffect } from "react";
import image from "../assets/user.png";
import "./profile-banner.css";

const ProfileBanner = ({ useNewApi, userId }) => {
  const originalApi = "http://34.131.250.17/api/user/details";
  const newApi = "http://34.131.250.17/api/user/:user/details";

  const apiEndpoint = useNewApi
    ? `http://34.131.250.17/api/user/${userId}/details`
    : "http://34.131.250.17/api/user/details";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPackage, setUserPackage] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userNotice, setUserNotice] = useState("");

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
          setUserPackage(data.package);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to handle profile picture change
  const handleProfilePictureChange = async () => {
    if (!newProfilePicture) {
      console.error("No new profile picture selected.");
      return;
    }

    const formData = new FormData();
    formData.append("newProfilePicture", newProfilePicture);

    try {
      const response = await fetch(
        `http://34.131.250.17/api/change-profile-picture`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Profile picture changed successfully");
        fetchUserDetails();
      } else {
        console.error("Failed to change profile picture");
      }
    } catch (error) {
      console.error("Error changing profile picture:", error);
    }
  };

  return (
    <>
      <div className="profile-banner">
        <div className="profile-left">
          <img src={userImage || image} alt="" />
        </div>
        <div className="profile-right">
          <div className="profile-name">
            <h1>{userName}</h1>
            <h3>Job Post</h3>
            <h4>Company</h4>
          </div>
          <hr />
          <div className="profile-details">
            <div className="profile-details-left">
              <h4>{userCity || "City Unknown"}</h4>
              <h4>{userExperience || "Experience Unknown"}</h4>
              <h4>{userPackage || "Package Unknown"}</h4>
            </div>
            <div className="profile-details-right">
              <h4>{userPhone || "Phone Unknown"}</h4>
              <h4>{userEmail}</h4>
              <h4>{userNotice || "Notice Period Unknown"}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
