import { Link } from "react-router-dom";
import PostData from "./PostData";
import "./OrgPosts.css";

const OrgPosts = () => {
  return (
    <>
      <div className="org-home">
        <div className="make-posts-btn">
          <Link to="/org/makepost">
            <button>Make new Job Post</button>
          </Link>
        </div>
        <div className="org-posts-1">
          <div className="org-post-heading">
            <h3>Your Job Posts</h3>
          </div>
          <div className="org-post-group">
            <PostData />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgPosts;
