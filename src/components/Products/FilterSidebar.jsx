import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    materials: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashioninsta",
    "ChickStyle",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const newFilters = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      materials: params.materials ? params.materials.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 1000,
    };

    setFilters(newFilters);
    setPriceRange([newFilters.minPrice, newFilters.maxPrice]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    const newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];

      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (value || value === 0) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handlePriceChange = (e) => {
    const newMax = Number(e.target.value);

    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newMax,
    };

    setPriceRange([0, newMax]);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <h3 className="text-xl font-semibold tracking-wide mb-8">Filters</h3>

      {/* CATEGORY */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Category</p>

        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 accent-black"
            />
            {category}
          </label>
        ))}
      </div>

      {/* GENDER */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Gender</p>

        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 accent-black"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* COLORS */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Color</p>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              name="color"
              value={color}
              onClick={() =>
                handleFilterChange({
                  target: { name: "color", value: color, type: "button" },
                })
              }
              className={`w-7 h-7 rounded-full border transition ${
                filters.color === color
                  ? "ring-2 ring-black"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Size</p>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label
              key={size}
              className={`px-3 py-1 border text-sm cursor-pointer ${
                filters.size.includes(size)
                  ? "bg-black text-white border-black"
                  : "hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="hidden"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* MATERIAL */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Material</p>

        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <label
              key={material}
              className={`px-3 py-1 border text-sm cursor-pointer ${
                filters.materials.includes(material)
                  ? "bg-black text-white border-black"
                  : "hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                name="materials"
                value={material}
                checked={filters.materials.includes(material)}
                onChange={handleFilterChange}
                className="hidden"
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      {/* BRAND */}
      <div className="mb-8 border-b pb-6">
        <p className="font-medium mb-3 text-gray-800">Brand</p>

        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className={`px-3 py-1 border text-sm cursor-pointer ${
                filters.brand.includes(brand)
                  ? "bg-black text-white border-black"
                  : "hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                className="hidden"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="mb-6">
        <p className="font-medium mb-3 text-gray-800">Price</p>

        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />

        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
