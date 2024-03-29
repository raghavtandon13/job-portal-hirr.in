import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./card.css";

const Card = ({ data, isCompanyLoggedIn }) => {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "c-dark" : "c-light";

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  useEffect(() => {
    async function fetchApplicationStatus() {
      try {
        const response = await fetch(`https://hirrin-backend.vercel.app/api/jobs/${data._id}/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setApplied(responseData.applied);
          setSaved(responseData.saved);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchApplicationStatus();
  }, [data._id, token]);

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
    }
    try {
      const response = await fetch(`https://hirrin-backend.vercel.app/api/jobs/${data._id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        setApplied(true);
        // const responseData = await response.json();

        // console.log("Job applied succesfully");
      } else {
        console.error("Job application failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleSave = async () => {
    if (!token) {
      navigate("/login");
    }
    try {
      const response = await fetch(`https://hirrin-backend.vercel.app/api/jobs/${data._id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        setSaved(!saved);
        // const responseData = await response.json();

        // console.log("Job save/unsave succesfully");
      } else {
        console.error("Job save/unsave failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: "Check out this job!",
          url: `https://hirrin-backend.vercel.app/job/${data._id}`, // Replace with the actual URL
        });
      } else {
        // console.log("Web Share API is not supported in this browser.");
        // Provide a fallback behavior or UI here.
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Handle the error if sharing fails.
    }
  };
  const picUrl = `https://hirrin-backend.vercel.app/api/static/uploads/${data.orgPicture}`;

  return (
    <>
      <div className={`card ${theme}`}>
        <div className="card-info">
          <div className="card-txt">
            <Link to={isCompanyLoggedIn ? `/org/jobs/${data._id}` : `/job/${data._id}`} style={{ color: "white" }}>
              <h3>{data.title}</h3>
            </Link>
            <Link to={`/org/${data.companyId}`}>
              <h4>{data.companyName}</h4>
            </Link>
            <p>Experience: {data.experience}</p>
            <p>Skills: {data.skills}</p>
            <p>Location: {data.location}</p>
          </div>
          <div className="card-pic">
            <img src={picUrl} alt="" />
          </div>
        </div>
        {/* {data.tags.map((tag, index) => {
          const color = getRandomColor();
          return (
            <button className="tag" key={tag} style={{ backgroundColor: color }}>
              {tag}
            </button>
          );  CHANGE API TO FETCH RESULTS 
        })} */}
        <div className="tags-group">
          <button>Remote</button>
          <button>New</button>
        </div>
        <div className="card-btns">
          {isCompanyLoggedIn ? (
            <Link to={`/org/jobs/${data._id}/edit`}>
              <button>
                <CreateIcon />
                Edit
              </button>
            </Link>
          ) : applied ? (
            <button style={{ backgroundColor: "gray" }}>Applied</button>
          ) : (
            <button onClick={handleApply}>Apply</button>
          )}
          <div className="btn-group">
            <button className="save-btn" onClick={handleSave}>
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </button>
            <button className="share-btn" onClick={handleShare}>
              <ShareIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
