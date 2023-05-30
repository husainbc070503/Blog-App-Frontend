import { Box, Grid, Item, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import BlogCard from "./BlogCard";
import Loader from "../Loader";

const BlogPosts = () => {
  const { posts } = useGlobalContext();
  return (
    <Box>
      <Grid container spacing={5}>
        {posts &&
          posts.map((p) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                key={p._id}
              >
                <BlogCard post={p} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default BlogPosts;
