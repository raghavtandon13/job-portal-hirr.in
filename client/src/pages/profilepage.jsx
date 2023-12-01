import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import ProfileBanner from "../components/profile-banner";
import Resume from "../components/resume";
import Footer from "../components/Footer";
import CreateIcon from "@mui/icons-material/Create";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./profilepage.css";

const Profilepage = () => {
  function handleLogout() {
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "orgtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return <Navigate to="/login" />;
  }
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "pp-dark" : "pp-light";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("mytoken");

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Find Jobs"
        button2Link="/user/applications"
        button2Label="Applicantions"
        funcBtn={handleLogout}
        funcBtnName="Logout"
        dropdownName={"Settings"}
        dropdown1="option #1"
        dropdown2="option #2"
        dropdown1Link="#"
        dropdown2Link="#"
      />
      <ProfileBanner />
      <Resume />
      <div className={`print-div ${theme}`}>
        <Link to={"/resume-builder"}>
          <button>
            Edit <CreateIcon />
          </button>
        </Link>
        <button className="print-btn" onClick={handlePrint}>
          Print to PDF
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profilepage;
