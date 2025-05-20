import React from "react";
import { Link } from "react-router-dom";
import { TiWeatherStormy } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import './Nav.css';
const Nav = () => {
  const navList = [
    { name: "Home", path: "/" },
    { name: "Weather", path: "/weather" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div className="sidebar">
      <div className="logo">
        <TiWeatherStormy />
      </div>
      <ul className="nav-list">
        {navList.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
