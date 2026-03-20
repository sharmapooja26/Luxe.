import React from "react";
import featuredImg from "../../assets/Featured.jpg";

const FeatureCollection = () => {
  return (
    <section className="w-full bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left max-w-xl">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Comfort & Style
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Apparel made for your everyday life
          </h1>

          <p className="text-gray-600 text-base md:text-lg">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <img
            src={featuredImg}
            alt="collection"
            className="w-full h-[350px] sm:h-[420px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;
