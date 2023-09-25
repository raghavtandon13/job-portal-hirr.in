import React from "react";
import Navbar from "../components/navbar";
import Search from "../components/search";
import SearchResults from "../components/searchResults";
import Footer from "../components/Footer";
import "./Searchpage.css";

const Searchpage = () => {
  function handleLogout() {
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }

  const isLoggedIn = () => {
    const token = document.cookie.includes("mytoken");
    token && console.log(token, "present mytoken");
    return token;
  };

  return (
    <>
      <div className="container">
        {isLoggedIn() ? (
          <Navbar
            buttonLink="/profile"
            buttonLabel="Profile"
            button2Link="/user/applications"
            button2Label="Applications"
            funcBtnName="Logout"
            funcBtn={handleLogout}
            dropdownName={"Settings"}
            dropdown1="option #1"
            dropdown2="option #2"
            dropdown2Link="#"
            dropdown1Link="#"
          />
        ) : (
          <Navbar
            buttonLink="/login"
            buttonLabel="Login"
            button2Link="/signup"
            button2Label="Register"
            funcBtnName="About Us"
          />
        )}
        <div className="wrapper-searchpage">
          <Search />
          <SearchResults />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Searchpage;
