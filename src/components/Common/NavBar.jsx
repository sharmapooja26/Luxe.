import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../../context/CartContext";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [user, setUser] = useState(null); // Track logged-in user
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const navigate = useNavigate();

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn && loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <>
      <nav className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6 py-4">
          <Link to="/" className="text-2xl font-semibold tracking-wide">
            Luxe.
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/collections?gender=women"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Women
            </Link>
            <Link
              to="/collections?gender=men"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Men
            </Link>
            <Link
              to="/collections?category=topwear"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              TopWear
            </Link>
            <Link
              to="/collections?category=bottomwear"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              BottomWear
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile Icon */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Name Badge */}
                <span className="bg-white text-black border border-black px-3 py-1 rounded-md hover:bg-black hover:text-white transition font-medium text-sm">
                  {user.name}
                </span>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-white text-black border border-black px-3 py-1 rounded-md hover:bg-black hover:text-white transition font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-black">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
            )}

            {/* Cart Icon */}
            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b">
          <button onClick={toggleNavDrawer}>
            <IoClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6 text-sm font-medium">
          <Link
            to="/collections?gender=women"
            onClick={toggleNavDrawer}
            className="text-gray-700 hover:text-black"
          >
            Women
          </Link>

          <Link
            to="/collections?gender=men"
            onClick={toggleNavDrawer}
            className="text-gray-700 hover:text-black"
          >
            Men
          </Link>

          <Link
            to="/collections?category=topwear"
            onClick={toggleNavDrawer}
            className="text-gray-700 hover:text-black"
          >
            TopWear
          </Link>

          <Link
            to="/collections?category=bottomwear"
            onClick={toggleNavDrawer}
            className="text-gray-700 hover:text-black"
          >
            BottomWear
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
