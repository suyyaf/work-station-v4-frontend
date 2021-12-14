import React from "react";
import Logout from "./auth/Logout";
import img from "../pages/img/ws-logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-green-400 p-8 text-white items-center">
      <div className="flex items-center">
        <img src={img} alt="ws-logo" className="h-10 pr-4" />
        <p className="font-bold text-lg">Work Space</p>
      </div>
      <Logout />
    </div>
  );
};

export default Navbar;
