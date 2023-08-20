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
import "./App.css";

function App() {
  const isLoggedIn = () => {
    const token = document.cookie.includes("mytoken");
    console.log("google", token);
    return token;
  };
  const isLoggedInOrg = () => {
    const token = document.cookie.includes("orgtoken");
    console.log(token);
    return token;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
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

          <Route
            path="/profile"
            element={
              isLoggedIn() ? <Profilepage /> : <Navigate to={"/login"} />
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
            element={
              isLoggedIn() ? <ApplicationsPage /> : <Navigate to={"/"} />
            }
          />

          <Route
            path="/user/reccos"
            element={isLoggedIn() ? <ReccoPage /> : <Navigate to={"/"} />}
          />

          <Route path="/search" element={<Searchpage />} />

          {/* Org Routes */}

          <Route
            path="/org/home"
            element={isLoggedInOrg() ? <Orghomepage /> : <Navigate to={"/"} />}
          />

          <Route
            path="/org/signup"
            element={
              isLoggedInOrg() ? (
                <Navigate to={"/org/home"} />
              ) : (
                <OrgsignupPage />
              )
            }
          />

          <Route
            path="/org/makepost"
            element={
              isLoggedInOrg() ? (
                <Makepostpage />
              ) : (
                <Navigate to={"/org/login"} />
              )
            }
          />

          <Route
            path="/org/login"
            element={
              isLoggedInOrg() ? <Navigate to={"/org/home"} /> : <Orgloginpage />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
