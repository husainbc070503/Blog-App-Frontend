import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../../../Contexts/BlogContext";

const PublishButton = styled(Button)`
  background-color: #ff6000;
  color: #000;
  font-size: 16px;
  transition: all 0.5s;
  &:hover {
    color: #700102;
    background: #f5eaea;
  }

  @media (max-width: 890px) {
    margin-left: 18px;
  }
`;

const BlogForm = () => {
  const { addPost } = useGlobalContext();

  const [image, setImage] = useState(
    "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600"
  );

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleImage = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error("Please upload!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "blog-app");
      data.append("cloud", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();

      if (resp) {
        toast.success("Image uploaded successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        setImage(resp.url);
      } else {
        toast.error("Failed to upload image", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    addPost(fields, image);
    setFields({
      title: "",
      description: "",
    });
    setImage("https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600")
  };

  return (
    <Box>
      <div className="blog-container form-container">
        <div className="image-header">
          <img src={image} alt="image" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="header form-header">
            <label htmlFor="image" className="add-label">
              <AddIcon fontSize="large" style={{ cursor: "pointer" }} />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="image-input"
              style={{ display: "none" }}
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <input
              placeholder="Title.."
              name="title"
              className="title"
              value={fields.title}
              onChange={handleChange}
            />
            <PublishButton type="submit" variant="contained" disabled={loading}>
              Publish
            </PublishButton>
          </div>

          <textarea
            rows={14}
            name="description"
            className="description"
            placeholder="Type your content here..."
            value={fields.description}
            onChange={handleChange}
          />
        </form>
      </div>

      <ToastContainer />
    </Box>
  );
};

export default BlogForm;
