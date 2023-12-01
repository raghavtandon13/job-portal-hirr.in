import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile-banner.css";

const UserCard = (data) => {
  return (
    <>
      <div className="profile-banner">
        <div className="profile-left">
          <img src={data.data.profilePicture} alt="" />
        </div>
        <div className="profile-right">
          <div className="profile-name">
            <Link to={`/users/${data.data._id}`}>
              <h1>{data.data.name}</h1>
            </Link>
            <h3>Add job Title Here</h3>
            <h4>Add Organization here</h4>
          </div>
          <hr />
          <div className="profile-details">
            <div className="profile-details-left">
              <h4>Add Location Here</h4>
              <h4>Add Experience here</h4>
              <h4>₹ Add salary here</h4>
            </div>
            <div className="profile-details-right">
              <h4>Add phone number here</h4>
              <h4>{data.data.email}</h4>
              <h4>Add notice period here</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
