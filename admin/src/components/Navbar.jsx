import React from "react";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-20 sm:w-[10%]" src={assets.logo_final} alt="" />
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text cursor-pointer">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
