import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="hover:text-gray-300 transition"
            aria-label="Meta"
          >
            <TbBrandMeta className="h-5 w-5" />
          </a>

          <a
            href="#"
            className="hover:text-gray-300 transition"
            aria-label="Instagram"
          >
            <IoLogoInstagram className="h-5 w-5" />
          </a>

          <a
            href="#"
            className="hover:text-gray-300 transition"
            aria-label="Twitter"
          >
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Shipping Message */}
        <div className="flex-1 text-center text-xs sm:text-sm font-medium">
          <span>We ship worldwide – Fast & reliable shipping 🚚</span>
        </div>

        {/* Contact */}
        <div className="hidden md:block text-sm">
          <a href="tel:+1234567890" className="hover:text-gray-300 transition">
            +1 (123) 567-890
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
