import React from "react";
import "./Header.css";
import logo from "./assets/Logo.png";

const Header = ({ currentTime, currentDate }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="SAT Logo" className="logo" />
          <div className="title-container">
            <div className="title">SPORTS AUTHORITY OF THAILAND</div>
            <div className="subtitle">Computer Accessories Management System</div>
          </div>
        </div>
        <div className="header-right">
          <div className="current-date">{currentDate}</div>
          <div className="current-time">{currentTime}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
