import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t mt-20">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>

          <p className="text-gray-500 mb-3 text-sm">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>

          <p className="text-sm mb-4">
            Sign up and get <span className="font-medium">10% off</span> your
            first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 text-sm outline-none"
            />

            <button className="bg-black text-white px-5 text-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-black cursor-pointer">Women</li>
            <li className="hover:text-black cursor-pointer">Men</li>
            <li className="hover:text-black cursor-pointer">Kids</li>
            <li className="hover:text-black cursor-pointer">New Arrivals</li>
            <li className="hover:text-black cursor-pointer">Sale</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-black cursor-pointer">Contact Us</li>
            <li className="hover:text-black cursor-pointer">Shipping</li>
            <li className="hover:text-black cursor-pointer">Returns</li>
            <li className="hover:text-black cursor-pointer">FAQ</li>
            <li className="hover:text-black cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-black cursor-pointer">Our Story</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black cursor-pointer">
              Terms & Conditions
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 text-gray-600">
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaInstagram className="cursor-pointer hover:text-black" />
            <FaTwitter className="cursor-pointer hover:text-black" />
            <FaYoutube className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Luxe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
