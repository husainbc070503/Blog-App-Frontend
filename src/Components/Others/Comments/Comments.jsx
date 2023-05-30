import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { Box, Typography, Zoom } from "@mui/material";
import styled from "@emotion/styled";
import Comment from "./Comment";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import { url } from "../../../Utils/API";

const Header = styled(Typography)`
  font-size: 26px;
  color: #212a3e;
`;

const Comments = ({ postId }) => {
  const { user } = useGlobalContext();
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${url}/api/comments/getAllComments/${postId}`);
      const data = await res.json();

      setComments(data.comments);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addComment = async (comment) => {
    if (!comment) {
      toast.error(`Please add comment!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    try {
      const res = await fetch(`${url}/api/comments/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ comment, postId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Comment added successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setComments([...comments, data.com]);
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await fetch(`${url}/api/comments/deleteComment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Comment deleted successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setComments(comments.filter((c) => c._id !== id));
        return;
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, comments]);

  return (
    <Box>
      <div className="blog-container">
        <Header>Comments</Header>
        {comments &&
          comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              deleteComment={deleteComment}
            />
          ))}

        <Header>Add yours..</Header>
        <AddComment addComment={addComment} user={user} />

        <ToastContainer transition={Zoom} />
      </div>
    </Box>
  );
};

export default Comments;
