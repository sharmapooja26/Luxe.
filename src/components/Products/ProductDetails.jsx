import React, { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";

import { useParams } from "react-router-dom";
import products from "../../data/products";

const ProductDetails = () => {
  const { addToCart } = useCart();

  const { id } = useParams();

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const allProducts = [...products, ...storedProducts];
  const product = allProducts.find((p) => p._id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">Product not found</div>
    );
  }

  const images =
    product.images || (product.image ? [{ url: product.image }] : []);
  const [selectedImage, setSelectedImage] = useState(images[0]?.url);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    addToCart(cartProduct);
    toast.success("Product added to cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Product Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`${product.name} ${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img.url ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[550px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-2xl font-medium mt-2 text-gray-800">
            ${product.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Premium quality product from our latest collection.
          </p>

          {/* Colors */}
          {product.colors && (
            <div className="mt-8">
              <p className="font-medium mb-3">Color</p>

              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mt-8">
              <p className="font-medium mb-3">Size</p>

              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 border rounded-md text-sm ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-8">
            <p className="font-medium mb-3">Quantity</p>

            <div className="flex items-center border w-fit">
              <button onClick={decreaseQty} className="px-4 py-2 border-r">
                -
              </button>

              <span className="px-6">{quantity}</span>

              <button onClick={increaseQty} className="px-4 py-2 border-l">
                +
              </button>
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-10 w-full bg-black text-white py-4 rounded-md hover:bg-gray-900 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
