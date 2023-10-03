import React from "react";
import Navbar from "../components/navbar";
import OrgPosts from "../components/OrgPosts";
import OrgProfile from "../components/OrgProfile";
import Footer from "../components/Footer"

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
        funcBtnName="Logout"
        dropdownName="Settings"
        dropdown1="option #1"
        dropdown1Link="#"
        dropdown2="option #2"
        dropdown2Link="#"
        funcBtn={handleLogout}
      />
      <OrgProfile />
      <OrgPosts />
      <Footer/>
    </>
  );
};

export default Orghomepage;
