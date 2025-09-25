import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/authSlice";

export default function Navbar() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logoutHandler = async () => {
    await dispatch(doLogout());
    nav("/login");
  };

  const navLinks = [
    { name: "Groups", path: "/groups" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-white hover:text-indigo-500 transition-all duration-300 drop-shadow-lg"
        >
          Cerebro
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-slate-300 font-medium hover:text-indigo-500 transition-colors duration-300 group"
            >
              {link.name}
              {/* Animated neon underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {auth.user ? (
            <>
              <Link
                to="/profile"
                className="relative text-slate-300 font-medium hover:text-yellow-400 transition-colors duration-300 group"
              >
                Profile
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <button
                onClick={logoutHandler}
                className="ml-3 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
