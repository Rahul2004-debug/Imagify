import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-8">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      {/* Right Side */}
      <div>
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Credits Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-110 transform transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="credits" />
              <p className="text-xs sm:text-sm font-medium text-gray-700"> Credits: {credit}</p>
            </button>

            {/* Hello, Username */}
            <p className="text-sm text-gray-700 hidden sm:block">
              Hello, {user.name || "User"}
            </p>

            {/* Profile Dropdown */}
            <div className="relative group cursor-pointer">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt="profile"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 text-black z-10 rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10  "
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-5">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-gray-700 hover:underline"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="text-white bg-zinc-800 px-7 py-2 sm:px-10 rounded-full hover:scale-110 transform transition duration-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
