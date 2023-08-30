import React from "react";
import Navbar from "../components/navbar";
import OrgPosts from "../components/OrgPosts";
import PostData from "../components/PostData";

const Orghomepage = () => {
  function handleLogout() {
    document.cookie =
      "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="org/login" />;
  }
  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Settings"
        button2Link="/signup"
        button2Label="Profile"
        funcBtn={handleLogout}
        funcBtnName="Logout"
      />
      <OrgPosts />
    </>
  );
};

export default Orghomepage;
