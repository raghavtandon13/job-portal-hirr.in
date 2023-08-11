import React from "react";
import Navbar from "../components/navbar";
import Search from "../components/search";
import SearchResults from "../components/searchResults"
import "./Searchpage.css";

const Searchpage = () => {
  return (
    <>
      <Navbar
        buttonLink="/login"
        buttonLabel="Login"
        button2Link="/signup"
        button2Label="Register"
      />
      <div className="wrapper-searchpage">
        <Search />
        <SearchResults/>
      </div>
    </>
  );
};

export default Searchpage;
