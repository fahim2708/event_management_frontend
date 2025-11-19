import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/"); // redirect to login
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Event Management System</h1>
        <button
          onClick={logout}
          className="flex items-center space-x-1 bg-red-600 px-3 py-1 rounded hover:bg-blue-400 hover:text-black transition-colors"
        >
          <span><IoIosLogOut size={25} /></span>
        </button>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4 text-sm">
        &copy; 2025 Event Management System
      </footer>
    </div>
  );
};

export default Layout;
