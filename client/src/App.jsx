import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Loginpage from "./pages/loginpage";
import SignUp from "./pages/signuppage";
import Profilepage from "./pages/profilepage";
import Homepage from "./pages/homepage";
import OrgsignupPage from "./pages/orgsignuppage";
import Orgloginpage from "./pages/orgloginpage";
import Orghomepage from "./pages/orghomepage";
import Makepostpage from "./pages/makepostpage";
import Searchpage from "./pages/Searchpage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SavedPage from "./pages/savedPage";
import ReccoPage from "./pages/reccoPage";
import ResumeBuilder from "./pages/Resume-Builder";
import JobDetails from "./pages/JobDetailsPage";
import OrgJobDetailsPage from "./pages/orgJobDetailsPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import Userpage from "./pages/Userpage";
import OrgJobEditPage from "./pages/OrgJobEditPage";
import { ToastContainer } from "react-toastify";

// import UploadPage from "./pages/upload";
import "./App.css";

function App() {
  const isLoggedIn = () => {
    const token = document.cookie.includes("mytoken");
    token && console.log(token, "present mytoken");
    return token;
  };
  const isLoggedInOrg = () => {
    const token = document.cookie.includes("orgtoken");
    console.log(token);
    return token;
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to={"/home"} /> : <Loginpage />}
        />

        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <Navigate to={"/home"} />
            ) : isLoggedInOrg() ? (
              <Navigate to={"/org/home"} />
            ) : (
              <LandingPage />
            )
          }
        />

        <Route
          path="/home"
          element={isLoggedIn() ? <Homepage /> : <Navigate to={"/"} />}
        />

        {/* <Route path="/oh" element={<Orghomepage />}/> */}
        {/* Dummy route */}

        <Route
          path="/profile"
          element={isLoggedIn() ? <Profilepage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/resume-builder"
          element={
            isLoggedIn() ? <ResumeBuilder /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/signup"
          element={isLoggedIn() ? <Navigate to={"/home"} /> : <SignUp />}
        />

        <Route
          path="/user/saved"
          element={isLoggedIn() ? <SavedPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/user/applications"
          element={isLoggedIn() ? <ApplicationsPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/user/reccos"
          element={isLoggedIn() ? <ReccoPage /> : <Navigate to={"/"} />}
        />

        <Route path="/search" element={<Searchpage />} />

        <Route path="/job/:jobId" element={<JobDetails />} />

        {/* Org Routes */}

        <Route
          path="/org/home"
          element={isLoggedInOrg() ? <Orghomepage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/org/signup"
          element={
            isLoggedInOrg() ? <Navigate to={"/org/home"} /> : <OrgsignupPage />
          }
        />

        <Route
          path="/org/makepost"
          element={
            isLoggedInOrg() ? <Makepostpage /> : <Navigate to={"/org/login"} />
          }
        />
        <Route
          path="/org/jobs/:jobId/edit"
          element={
            isLoggedInOrg() ? <OrgJobEditPage/> : <Navigate to={"/org/login"} />
          }
        />

        <Route
          path="/org/login"
          element={
            isLoggedInOrg() ? <Navigate to={"/org/home"} /> : <Orgloginpage />
          }
        />
        <Route path="org/jobs/:jobId" element={<OrgJobDetailsPage />} />
        <Route path="org/jobs/:jobId/applicants" element={<ApplicantsPage />} />
        <Route path="users/:userId" element={<Userpage />} />
      </Routes>

      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </>
  );
}

export default App;
