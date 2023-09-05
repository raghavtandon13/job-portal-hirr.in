import React from "react";
import { useParams } from "react-router-dom";
import Resume from "../components/resume";
import ProfileBanner from "../components/profile-banner";

const Userpage = () => {
  const { userId } = useParams();
  return (
    <>
      <ProfileBanner useNewApi={true} userId={userId}/>
      <Resume />
    </>
  );
};

export default Userpage;
