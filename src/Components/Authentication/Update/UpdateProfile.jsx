import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import "./Update.css";
import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Utils/API";

const Input = styled(TextField)`
  width: 100%;
  margin: 18px auto;
`;

const UpdateButton = styled(Button)`
  display: block;
  margin: 16px auto 0;
  background: #3ec1d3;
  color: #1e2022;

  &:hover {
    background: #100200;
    color: #fff;
  }
`;

const UpdateProfile = () => {
  const { user } = useGlobalContext();
  const [image, setImage] = useState(
    user.image
      ? user.image
      : "https://static.thenounproject.com/png/12017-200.png"
  );

  const [updateUser, setUpdateUser] = useState({
    name: user?.name,
    email: user?.email,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImage = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error("Please upload profile pic!", {
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
      const res = await fetch(url, { method: "POST", body: data });

      const result = await res.json();
      if (result) {
        toast.success("Profile image uploaded successfully.", {
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
        setImage(result.url);
      } else {
        toast.error("Failed to upload pic", {
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

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: updateUser.name,
          email: updateUser.email,
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Profile updated successfully.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("blog-user", JSON.stringify(data.user));
        navigate("/");
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

  return (
    <Box>
      <div className="update-profile-container">
        <h2>Update Profile</h2>
        <div className="image">
          <img src={image} alt="profile-pic" />
          <label htmlFor="file">
            <i className="fa-solid fa-pen"></i>
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImage(e.target.files[0])}
          />
        </div>
        <form className="update-form" onSubmit={handleSubmit}>
          <Input
            name="name"
            value={updateUser.name}
            onChange={handleChange}
            label="Name"
          />
          <Input
            name="email"
            value={updateUser.email}
            onChange={handleChange}
            label="Email"
          />
          <UpdateButton type="submit" variant="contained" disabled={loading}>
            Update
          </UpdateButton>
        </form>
      </div>

      <ToastContainer />
    </Box>
  );
};

export default UpdateProfile;
