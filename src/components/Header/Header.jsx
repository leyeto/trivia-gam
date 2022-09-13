import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h3 className="header__title">Adeleye's trivia website</h3>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default Header;
