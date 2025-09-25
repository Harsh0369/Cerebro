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

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-indigo-600">
          Cerebro
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/groups" className="text-gray-700">
            Groups
          </Link>
          <Link to="/dashboard" className="text-gray-700">
            Dashboard
          </Link>
          {auth.user ? (
            <>
              <Link to="/profile" className="text-gray-700">
                Profile
              </Link>
              <button onClick={logoutHandler} className="text-sm text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-indigo-600">
                Login
              </Link>
              <Link to="/signup" className="text-indigo-600">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
