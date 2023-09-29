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
        buttonLabel="Posts"
        button2Label="Profile"
        funcBtnName="About Us"
        dropdownName="Settings"
        funcBtn={handleLogout}
      />
      <OrgPosts />
    </>
  );
};

export default Orghomepage;
