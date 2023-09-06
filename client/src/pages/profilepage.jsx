import React from "react";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import Resume from "../components/resume";
import Footer from "../components/Footer";
import "./profilepage.css";

const Profilepage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Find Jobs"
        button2Link="/signup"
        button2Label="Settings"
      />
      <ProfileBanner />
      <Resume />
      <div className="print-div">
        <button className="print-btn" onClick={handlePrint}>
          Print to PDF
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profilepage;
