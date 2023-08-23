import React from "react";
import Navbar from "../components/navbar";
import Search from "../components/search";
import SearchResults from "../components/searchResults";
import Footer from "../components/Footer";
import "./Searchpage.css";

const Searchpage = () => {
  return (
    <>
      <div className="container">
        <Navbar
          buttonLink="/login"
          buttonLabel="Login"
          button2Link="/signup"
          button2Label="Register"
        />
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
