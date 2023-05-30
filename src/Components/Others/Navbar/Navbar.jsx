import React, { useState } from "react";
import { useGlobalContext } from "../../../Contexts/BlogContext";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import styled from "@emotion/styled";

const Dropdown = styled(Button)`
  font-size: 18px;
  text-transform: capitalize;
`;

const Navbar = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <Typography className="heading">Blog Book</Typography>
        </div>

        <div className="lists">
          <Link to="/" className="home">
            Home
          </Link>
          <i
            className={`fa-solid fa-${open ? "xmark" : "bars"} icons`}
            onClick={() => setOpen(!open)}
          ></i>
          {user ? (
            <div className={`dropdown ${open ? "toggle" : ""}`}>
              <div className="dropdown-button">
                <Button variant="contained">Welcome, {user.name}</Button>
              </div>
              <div className="dropdown-content">
                <div className="dropdown-menu">
                  <Typography
                    className="menu-item"
                    onClick={() => navigate("updateProfile")}
                  >
                    Update Profile
                  </Typography>
                  <Typography
                    className="menu-item"
                    onClick={() => {
                      localStorage.removeItem("blog-user");
                      navigate("login");
                    }}
                  >
                    Logout
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <div className={`buttons ${open ? "toggle" : ""}`}>
              <Button variant="contained" onClick={() => navigate("login")}>
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
