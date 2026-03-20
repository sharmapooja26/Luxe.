import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/Hero.jpg";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight">
            Vacation <br /> Ready
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Explore our vacation-ready outfits designed for comfort, style, and
            unforgettable summer moments.
          </p>

          <Link
            to="/collections"
            className="inline-block bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-[420px] sm:h-[520px] md:h-[600px] object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
