import React from "react";
import { useState, useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./card.css";

const Card = ({ data }) => {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  useEffect(() => {
    async function fetchApplicationStatus() {
      try {
        const response = await fetch(
          `http://localhost:3000/jobs/${data._id}/status`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setApplied(responseData.applied);
          setSaved(responseData.saved);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplicationStatus();
  }, [data._id]);

  const handleApply = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/jobs/${data._id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        setApplied(true);
        const responseData = await response.json();

        console.log("Job applied succesfully");
      } else {
        console.error("Job application failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <div className="card">
        <h3>{data.title}</h3>
        <h4>{data.companyName}</h4>
        <p>Experience: {data.experience}</p>
        <p>Skills: Javascrpit,Typescript, MERN stack</p>
        <p>Location: Delhi</p>
        <div className="card-btns">
          {applied ? (
            <button style={{ backgroundColor: "gray" }}>Applied</button>
          ) : (
            <button onClick={handleApply}>Apply</button>
          )}
          {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </div>
      </div>
    </>
  );
};

export default Card;
