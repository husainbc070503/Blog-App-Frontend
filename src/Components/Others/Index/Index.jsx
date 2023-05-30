import { Link, useNavigate } from "react-router-dom";
import "./Index.css";
import React from "react";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import Blogs from "../Blogs/Blogs";

const Index = () => {
  const { user } = useGlobalContext();

  const imgUrl =
    "https://mehulk05.github.io/Blogapp-using-MERN/static/media/asset-1.171cd5d9.png";
  return (
    <div className="container">
      {!user ? (
        <div className="card">
          <div className="left-view">
            <div className="title">
              <h2>Tell Your Story to the World</h2>
            </div>
            <p className="content">
              Join with us! Write your story and share !!
            </p>
            <Link className="link" to={`${user ? "createPost" : "login"}`}>Create Blog</Link>
          </div>
          <div className="right-view">
            <img src={imgUrl} alt="logo" />
          </div>
        </div>
      ) : (
        <Blogs />
      )}
    </div>
  );
};

export default Index;
