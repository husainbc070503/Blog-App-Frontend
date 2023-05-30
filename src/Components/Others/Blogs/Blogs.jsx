import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./Blog.css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import BlogPosts from "./BlogPosts";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import Loader from "../Loader";

const CreateButton = styled(Link)`
  background-color: #00ffca;
  color: #102030;
  font-size: 16px;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    color: white;
    background: #100720;
  }

  @media (max-width: 890px) {
    margin: 0 auto 30px;
  }
`;

const SearchField = styled(TextField)`
  @media (max-width: 890px) {
    width: 320px;
  }
`;

const Blogs = () => {
  const { search, setSearch, loading } = useGlobalContext();

  return (
    loading ? <Loader /> :
      <Box>
        <div className="blog-container">
          <h2 className="heading">All Blogs</h2>
          <div className="header">
            <CreateButton to="createPost">Create One</CreateButton>
            <div className="input-group">
              <i className="fa-solid fa-magnifying-glass"></i>
              <SearchField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <BlogPosts />
        </div>
      </Box>
  );
};

export default Blogs;
