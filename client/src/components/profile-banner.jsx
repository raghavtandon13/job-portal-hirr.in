import React from 'react'
import image from "../assets/profile-pic.jpg"
import "./profile-banner.css"

const ProfileBanner = () => {
  return (
    <>
    <div className="profile-banner">
        <div className="profile-left">
            <img src={image} alt="" />
        </div>
        <div className="profile-right">
            <div className="profile-name">
                <h2>First Name Last Name</h2>
                <h3>Backend Developer</h3>
                <h4>at Google</h4>
            </div>
            <div className="profile-details">
                <div className="profile-details-left"></div>
                <div className="profile-details-right"></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfileBanner