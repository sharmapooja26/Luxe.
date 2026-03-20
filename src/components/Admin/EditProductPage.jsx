import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    sizes: "",
    colors: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const existingProduct = products.find((p) => p.id === Number(id));

      if (existingProduct) {
        setProduct(existingProduct);
        setPreview(existingProduct.image);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; 
      setPreview(base64String);
      setProduct((prev) => ({
        ...prev,
        image: base64String,
      }));
    };
    reader.readAsDataURL(file); // convert file to base64
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (isEditMode) {
      const updatedProducts = products.map((p) =>
        p.id === Number(id) ? { ...product, id: Number(id) } : p,
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      const newProduct = { ...product, id: Date.now() };
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
    }

    
    navigate("/admin/products");
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Product Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SKU */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Sizes (comma separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            placeholder="S,M,L"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Colors (comma separated)
          </label>
          <input
            type="text"
            name="colors"
            value={product.colors}
            onChange={handleChange}
            placeholder="Black,White"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
          >
            {isEditMode ? "Update Product" : "Add Product"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
