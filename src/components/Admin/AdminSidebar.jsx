import React from "react";
import {
  FaBoxOpen,
  FaClipboard,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user on logout
    navigate("/");
  };

  return (
    <div className="p-6 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-bold text-gray-900">
          Luxe.
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-6 text-gray-700 text-center">
        Admin Dashboard
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-100 text-gray-900 py-3 px-4 rounded flex items-center space-x-2 font-medium"
              : "text-gray-700 hover:bg-gray-50 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-100 text-gray-900 py-3 px-4 rounded flex items-center space-x-2 font-medium"
              : "text-gray-700 hover:bg-gray-50 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-100 text-gray-900 py-3 px-4 rounded flex items-center space-x-2 font-medium"
              : "text-gray-700 hover:bg-gray-50 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboard />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-100 text-gray-900 py-3 px-4 rounded flex items-center space-x-2 font-medium"
              : "text-gray-700 hover:bg-gray-50 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded flex items-center justify-center space-x-2 font-medium"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
