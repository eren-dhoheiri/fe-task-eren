import React from "react";
import { Logo } from "../../assets";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </header>
  );
};

export default Navbar;
