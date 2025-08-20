import React from "react";
import logo from "../assets/images/logo.svg";
import "../css/headerCard.css";
function HeaderCard() {
  return (
    <>
      <div className="header">
        <button className="menu-button">MENU</button>
        <img src={logo} />
        <button className="restart-button">RESTART</button>
      </div>
    </>
  );
}

export default HeaderCard;
 