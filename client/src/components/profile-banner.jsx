import React, { useState, useEffect, useRef } from "react";
import image from "../assets/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./profile-banner.css";

const ProfileBanner = ({ useNewApi, userId, showUpload = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const originalApi = "https://hirrin-backend.vercel.app/api/user/details";
  const newApi = "https://hirrin-backend.vercel.app/api/user/:user/details";

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "pb-dark" : "pb-light";

  const apiEndpoint = useNewApi ? `https://hirrin-backend.vercel.app/api/user/${userId}/details` : "https://hirrin-backend.vercel.app/api/user/details";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");
  const orgToken = getCookie("orgtoken");

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPackage, setUserPackage] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userNotice, setUserNotice] = useState("");
  const [showEmail, setShowEmail] = useState(false);

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

    if (!isEditing) {
      fetchUserDetails();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("newProfilePicture", fileInputRef.current.files[0]); // Add the selected file to the form data

      const response = await fetch("https://hirrin-backend.vercel.app/api/change-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData, // Set the form data as the request body
      });

      if (response.ok) {
        // Image successfully uploaded, handle any other actions needed
        // Reset the visibility:
        setIsEditing(false);
        toast.success("Profile Picture Saved", {
          onClose: () => {},
        });
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleChooseFileClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <>
      <div className={`profile-banner ${theme}`}>
        <div className="profile-left">
          <div className="image-container">
            <img src={userImage || image} alt="" />
            {showUpload && !isEditing && (
              <button style={{ fontSize: "10px" }} className="hover-button" onClick={handleEditClick}>
                Edit
              </button>
            )}
            {showUpload && isEditing && (
              <div className="img-div">
                <label
                  style={{
                    fontSize: "12px",
                    border: "1px solid white",
                    padding: "4px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                  className="file-input-button"
                >
                  Upload
                  <input className="img-div-in" ref={fileInputRef} type="file" id="image-upload" style={{ display: "none" }} />
                </label>
                <button style={{ fontSize: "10px" }} onClick={handleSaveClick}>
                  Save
                </button>
              </div>
            )}
          </div>
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
      {orgToken && (
        <div className="profile-contact-div">
          <button
            onClick={() => {
              setShowEmail(!showEmail);
            }}
          >
            Conatct vis Email
          </button>
          {showEmail && <h4>{userEmail}</h4>}
        </div>
      )}
    </>
  );
};

export default ProfileBanner;
