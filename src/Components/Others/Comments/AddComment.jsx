import { Button, Box } from "@mui/material";
import React, { useState } from "react";
import "./Comments.css";
import styled from "@emotion/styled";

const PostButton = styled(Button)`
  background: #38e54d;
  color: #100720;
  transition: 0.5s all;

  &:hover {
    background: #100720;
    color: #38e54d;
  }
`;

const AddComment = ({ addComment, user }) => {
  const url = user?.image
  const [comment, setComment] = useState();

  return (
    <Box>
      <div className="comment">
        <img src={url} alt="user" className="user-pic" />
        <textarea
          name="comment-box"
          rows="3"
          className="comment-box"
          placeholder="Text here.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <PostButton
          variant="contained"
          onClick={() => {
            addComment(comment);
            setComment("");
          }}
        >
          Post
        </PostButton>
      </div>
    </Box>
  );
};

export default AddComment;
