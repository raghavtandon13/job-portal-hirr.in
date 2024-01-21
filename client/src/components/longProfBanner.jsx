import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
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
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "lb-dark" : "lb-light";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/user/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          // console.log(data.profilePicture);
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
    <div className={`${theme}`}>
      <div className="long-banner">
        <div className="long-left">
          <img src={userImage || image} alt="" />
        </div>
        <div className="long-right">
          <div className="long-name">
            <Link to={"/profile"}>
              <h1>{userName}</h1>
            </Link>
            <h3>{userData?.resume?.employment?.[0]?.employmentType?.join(", ")}</h3>
            <h4>{userData?.resume?.employment?.[0]?.currentCompany}</h4>
          </div>
          <hr />
          {userData?.resume?.employment ? (
            <div className="long-details">
              <div className="long-details-left">
                <h4>New Delhi, India</h4>
                <h4>{userData?.resume?.employment?.[0]?.totalExperience} Years</h4>
                <h4>₹ {userData?.resume?.employment?.[0]?.salary}</h4>
              </div>
              <div className="long-details-right">
                <h4>{userData.phone}</h4>
                <h4>{userEmail}</h4>
                <h4>15 days of notice</h4>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LongBanner;
