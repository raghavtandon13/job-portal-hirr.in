import React from "react";
import PostData from "./PostData";
import "./OrgPosts.css";

const OrgPosts = () => {
  return (
    <>
      <div className="org-home">
        <div className="org-posts-1">
          <div className="org-post-heading">
            <h3>Your Job Posts</h3>
          </div>
          <div className="org-post-group">
            <PostData />
          </div>
        </div>
        <div className="make-posts-btn">
          <button>Make new Job Post</button>
        </div>
      </div>
    </>
  );
};

export default OrgPosts;
