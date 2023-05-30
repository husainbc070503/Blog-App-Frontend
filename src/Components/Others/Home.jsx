import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
