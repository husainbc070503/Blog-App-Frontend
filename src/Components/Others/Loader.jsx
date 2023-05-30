import { CircularProgress } from "@mui/joy";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const colors = ["success", "danger", "primary", "info", "neutral", "warning"];
  const [color, setColor] = useState("success");

  useEffect(() => {
    setInterval(() => {
      setColor(colors[Math.floor(Math.random() * 6)]);
    }, 2000);
  });

  return (
    <div
      className="loader-container"
      style={{ height: "100vh", position: "relative" }}
    >
      <div
        className="loader"
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <CircularProgress color={color} size="lg" variant="outlined" />
      </div>
    </div>
  );
};

export default Loader;
