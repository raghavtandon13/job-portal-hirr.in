import { useContext } from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const Button = ({ children, link, style, handleClick }) => {
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "button-dark" : "button-light";
  return (
    <Link to={link}>
      <button className={theme} style={style} onClick={handleClick}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
