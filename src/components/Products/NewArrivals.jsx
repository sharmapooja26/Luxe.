import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import product1 from "../../assets/Men1.jpg";
import product2 from "../../assets/Men2.jpg";
import product3 from "../../assets/Men3.jpg";
import product4 from "../../assets/Women1.jpg";
import product5 from "../../assets/Women2.jpg";
import product6 from "../../assets/Women3.jpg";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* Products */
  const newArrivals = [
    {
      _id: "1",
      name: "Men's Shirt",
      price: 120,
      images: [{ url: product1 }],
    },
    {
      _id: "2",
      name: "Men's Casual Shirt",
      price: 110,
      images: [{ url: product2 }],
    },
    {
      _id: "3",
      name: "Men's Premium Shirt",
      price: 130,
      images: [{ url: product3 }],
    },
    {
      _id: "4",
      name: "Women's Floral Top",
      price: 95,
      images: [{ url: product4 }],
    },
    {
      _id: "5",
      name: "Women's Stylish Top",
      price: 105,
      images: [{ url: product5 }],
    },
    {
      _id: "6",
      name: "Women's Casual Top",
      price: 99,
      images: [{ url: product6 }],
    },
  ];

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }

    updateScrollButtons();

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-[#f7f3ef]">
      {/* Heading */}
      <div className="container mx-auto px-4 mb-10 flex justify-between items-end">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            New Collection
          </p>

          <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
            New Arrivals
          </h2>

          <div className="w-20 h-[2px] bg-black mt-4 mb-4"></div>

          <p className="text-gray-500 max-w-md">
            Discover the latest pieces from our newest collection designed for
            the upcoming season.
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border rounded-full ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border rounded-full ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Products */}
      <div
        ref={scrollRef}
        className="container mx-auto flex space-x-6 overflow-x-auto px-4 scrollbar-hide"
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-[260px] bg-white rounded-lg">
            {/* Image */}
            <div className="relative">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-[360px] object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <Link to={`/product/${product._id}`} state={{ product }}>
                <h4 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h4>

                <p className="text-sm text-gray-500 mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
