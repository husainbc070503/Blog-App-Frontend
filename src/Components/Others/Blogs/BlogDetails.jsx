import styled from "@emotion/styled";
import { Box, Icon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import Comments from "../Comments/Comments";
import { url } from "../../../Utils/API";
import Loader from "../Loader";

const Title = styled(Typography)`
  line-height: 2rem;
  font-size: 42px;
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  background: linear-gradient(to right top, #ed2b2a, #ffd93d);
  background-size: 50px;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: move 10s linear infinite alternate;
  padding: 16px 0;

  @media (max-width: 890px) {
    text-align: justify;
    line-height: 3.2rem;
  }

  @keyframes move {
    from {
      background-position: 0;
    }
    to {
      background-position: 100%;
    }
  }
`;

const Author = styled(Box)`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;

  @media (max-width: 890px) {
    flex-wrap: wrap;
  }
`;

const Description = styled(Typography)`
  text-align: justify;
  color: #212a3e;
`;

const Icons = styled(Box)`
  float: right;
  margin: 20px 0;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const { user, deletePost } = useGlobalContext();
  const [load, setLoad] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${url}/api/blog/getPost/${id}`);
      const data = await res.json();

      setPost(data.post);
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
    setLoad(true);
    setTimeout(() => {
      fetchPost();
      setLoad(false);
    }, 5000);
  }, [id]);

  return (
    <Box>
      {load ? (
        <Loader />
      ) : (
        post && (
          <Box>
            <div className="blog-container form-container">
              <div className="image-header">
                <img src={post.image} alt="image" />
              </div>

              <Box>
                {post.user.name === user.name && (
                  <>
                    <Icons>
                      <Link className="updateLink" to={`../updatePost/${id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <i
                        className="fa fa-trash"
                        onClick={() => deletePost(post._id)}
                      ></i>
                    </Icons>
                  </>
                )}
              </Box>

              <Title>{post.title}</Title>

              <Author>
                <Typography fontWeight="bold" marginTop="8px">
                  Author:{" "}
                  <span
                    style={{
                      color: "#2B3467",
                      fontSize: "17px",
                    }}
                  >
                    {post.user.name}
                  </span>
                </Typography>

                <Typography fontWeight="bold" marginTop="8px">
                  Created on:{" "}
                  <span style={{ color: "#635985" }}>
                    {new Date(post.createdAt).toDateString()}
                  </span>
                </Typography>
              </Author>

              <Description>{post.description}</Description>
            </div>
            )
            <Comments postId={id} />
          </Box>
        )
      )}
    </Box>
  );
};

export default BlogDetails;
