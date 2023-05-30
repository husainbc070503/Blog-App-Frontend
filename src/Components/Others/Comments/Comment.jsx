import { Box, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import "./Comments.css";
import styled from "@emotion/styled";

const User = styled(Box)`
  display: flex;
  align-items: center;
`;

const UserName = styled(Typography)`
  font-size: 16px;
  margin-left: 8px;
  color: #526d82;
`;

const CommDate = styled(Typography)`
  display: inline-block;
  color: #526d82;
  margin-right: 10px;

  @media (max-width: 890px) {
    display: none;
  }
`;

const UserComment = styled(Typography)`
  width: 90%;
  margin: 18px auto;
  padding: 10px 20px;
  box-shadow: 0px 10px 30px #9ba4b54f;
  border-radius: 8px;
  font-weight: 400;
  color: #212a3e;
`;

const Comment = ({ comment, deleteComment }) => {
  const { user } = useGlobalContext();
  return (
    <Box>
      <div className="comment-container">
        <div className="details">
          <User>
            <img
              src={comment.user.image}
              alt="user"
              width="42"
              style={{ borderRadius: "50%" }}
            />
            <UserName>{comment.user.name}</UserName>
          </User>
          <Box>
            <CommDate>{new Date(comment.createdAt).toDateString()}</CommDate>
            {comment.user.name === user.name ? (
              <i
                className="fa-solid fa-trash"
                style={{ color: "#394867" }}
                onClick={() => deleteComment(comment._id)}
              ></i>
            ) : (
              ""
            )}
          </Box>
        </div>

        <UserComment>{comment.comment}</UserComment>
      </div>
    </Box>
  );
};

export default Comment;
