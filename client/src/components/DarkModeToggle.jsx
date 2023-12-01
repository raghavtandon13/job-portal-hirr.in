import React, { useContext } from "react";
import "./darkModeToggle.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  return (
    <div className="toggleCon" onClick={toggle}>
      <div className="icon">🌙</div>
      <div className="icon">🔆</div>
      <div className="ball" style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  );
};

export default DarkModeToggle;
