import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useCart } from "../../context/CartContext";

const CartContents = () => {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((product) => {
        const itemTotal = (product.price * product.quantity).toFixed(2);

        return (
          <div
            key={`${product._id}-${product.size}-${product.color}`}
            className="flex items-start justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover rounded"
              />

              <div>
                <h3 className="font-medium text-gray-800">{product.name}</h3>

                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      decreaseQty(product._id, product.size, product.color)
                    }
                    className="border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="mx-3 font-medium">{product.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQty(product._id, product.size, product.color)
                    }
                    className="border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold text-gray-800">${itemTotal}</p>

              <button
                onClick={() =>
                  removeItem(product._id, product.size, product.color)
                }
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <RiDeleteBin3Line className="w-6 h-6" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
