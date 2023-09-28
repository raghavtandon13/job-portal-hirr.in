import React from "react";
import Search from "./search";
import "./banner.css";
import att from "../assets/logos/att-logo-removebg-preview.png";
import amazon from "../assets/logos/amazon-logo-removebg-preview.png";
import cisco from "../assets/logos/cisco-logo-removebg-preview.png";
import google from "../assets/logos/google-logo-removebg-preview.png";
import intel from "../assets/logos/intel-logo-removebg-preview.png";
import microsoft from "../assets/logos/microsoft-logo-removebg-preview.png";
import samsung from "../assets/logos/samsung-logo-removebg-preview.png";
import toyota from "../assets/logos/toyota-logo-removebg-preview.png";
// import ViewInArTwoToneIcon from "@mui/icons-material/ViewInArTwoTone";
import cube from "../assets/cube.svg";
import { Link } from "react-router-dom";
const Banner = ({ heading, subheading }) => {
  const defaultHeading = "Find your dream job now";
  const defaultSubheading = "5 lakh+ jobs for you to explore";

  return (
    <div className="banner">
      <div className="banner-heading">
        <h1>{heading || defaultHeading}</h1>
        <p>{subheading || defaultSubheading}</p>
      </div>
      <Search />
      <div className="brands">
        <img src={att} alt="" />
        <img src={amazon} alt="" />
        <img src={cisco} alt="" />
        <img src={google} alt="" />
        <img src={intel} alt="" />
        <img src={microsoft} alt="" />
        <img src={samsung} alt="" />
        <img src={toyota} alt="" />
      </div>
      <div className="banner-pro">
        <div className="banner-pro-left">
          <h1>Discover Your Dream Job Today</h1>
          <Link to={"/signup"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="banner-pro-right">
          <div className="banner-part">
            <div className="banner-part-l">
              <img src={cube} alt="" />
              <hr />
            </div>
            <div className="banner-part-r">
              <h3>Easy process</h3>
              <h4>
                Create your profile, search jobs and apply with just a few
                clicks.
              </h4>
            </div>
          </div>
          <div className="banner-part">
            <div className="banner-part-l">
              <img src={cube} alt="" />
              <hr />
            </div>
            <div className="banner-part-r">
              <h3>Job Matches</h3>
              <h4>
                Receive personalized job recommendations based on your skills
                and preferences.
              </h4>
            </div>
          </div>
          <div className="banner-part">
            <div className="banner-part-l">
              <img src={cube} alt="" />
              <hr />
            </div>
            <div className="banner-part-r">
              <h3>Connect with Employers</h3>
              <h4>
                Engage with potential employers through messaging and interview
                requests.
              </h4>
            </div>
          </div>
          <div className="banner-part">
            <div className="banner-part-l">
              <img src={cube} alt="" />
            </div>
            <div className="banner-part-r">
              <h3>Stay Updated</h3>
              <h4>
                Get notifications on new job openings and updates on your
                application status.{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Banner.defaultProps = {
  heading: "Find your dream job now",
  subheading: "5 lakh+ jobs for you to explore",
};
export default Banner;
