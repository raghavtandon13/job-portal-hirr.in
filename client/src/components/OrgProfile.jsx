import { useEffect, useState } from "react";
import image from "../assets/user.png";
import "./OrgProfile.css";

const OrgProfile = ({ useNewApi, companyId }) => {
  const [data, setData] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("orgtoken");

  const originalApi = "https://hirrin-backend.vercel.app/api/company/details";
  const newApi = "https://hirrin-backend.vercel.app/api/company/:company/details";

  const apiEndpoint = useNewApi ? `https://hirrin-backend.vercel.app/api/company/${companyId}/details` : "https://hirrin-backend.vercel.app/api/company/details";

  // const picUrl = `https://hirrin-backend.vercel.app/api/static/uploads/${data.orgPicture}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiEndpoint, {
          headers: {
            Authorization: `${token}`, // You may need to add the token to your headers
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [apiEndpoint, token]);

  const picUrl = data ? `https://hirrin-backend.vercel.app/api/static/uploads/${data.orgPicture}` : image; // Use the imported image if there's no photo in the data

  return (
    <>
      {data ? (
        <div className="org-profile">
          <div className="org-photo">
            <img src={picUrl} alt="" /> {/* Use the dynamic picUrl here */}
          </div>
          <div className="org-details">
            <h1>{data.companyName}</h1>
            <h4>{data.industry}</h4>
            <h4>Address</h4> {/* You can add the address here */}
            <h4>{data.email}</h4>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default OrgProfile;
