import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import products from "../data/products";

const CollectionPage = () => {
  const [productList, setProductList] = useState([]);
  const [searchParams] = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setProductList([...products, ...storedProducts]);
  }, []);

  // Read filters from URL
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const materials = searchParams.get("materials");
  const brand = searchParams.get("brand");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

  // SORT PARAM
  const sortBy = searchParams.get("sortBy");

  // FILTER PRODUCTS
  const filteredProducts = productList.filter((product) => {
    if (
      category &&
      product.category.toLowerCase().replace(/\s/g, "") !==
        category.toLowerCase().replace(/\s/g, "")
    )
      return false;

    if (gender && product.gender.toLowerCase() !== gender.toLowerCase())
      return false;

    if (color && !product.colors.includes(color)) return false;

    if (size && !size.split(",").some((s) => product.sizes.includes(s)))
      return false;

    if (materials && product.material !== materials) return false;

    if (brand && !brand.split(",").includes(product.brand)) return false;

    if (product.price < minPrice || product.price > maxPrice) return false;

    return true;
  });

  // SORT PRODUCTS
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "popularity") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-black text-white px-4 py-3 rounded-full flex items-center shadow-lg"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden"></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed lg:static
          top-0 left-0
          h-full lg:h-auto
          w-72
          bg-white
          border-r
          z-40
          transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          transition-transform duration-300
        `}
      >
        <FilterSidebar />
      </div>

      {/* Product Section */}
      <div className="flex-1 p-6 lg:p-8">
        <h2 className="text-2xl uppercase font-semibold mb-6 tracking-wide">
          All Collections
        </h2>

        <SortOptions />

        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  );
};

export default CollectionPage;
