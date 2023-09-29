import React from "react";
import { useParams } from "react-router-dom";
import Resume from "../components/resume";
import ProfileBanner from "../components/profile-banner";
import Navbar from "../components/navbar";

const Userpage = () => {
  const { userId } = useParams();
  return (
    <>
      <Navbar
        buttonLabel="Posts"
        button2Label="New Job"
        funcBtnName="About Us"
        dropdownName="Settings"
      />
      <ProfileBanner useNewApi={true} userId={userId} />
      
      <Resume useNewApi={true} userId={userId} />
    </>
  );
};

export default Userpage;
