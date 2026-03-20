import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    // FIRST: check if order came from navigation
    if (location.state?.order) {
      setOrder(location.state.order);
      return;
    }

    // FALLBACK: fetch from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const userOrders = allOrders[user.email] || [];
    const currentOrder = userOrders.find((o) => o._id === id);

    setOrder(currentOrder);
  }, [id, navigate, location]);

  if (!order) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading your order...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-6">
      <div className="w-16 h-16 flex items-center justify-center mb-6 border-2 border-gray-300 rounded-full">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Thank you
      </h1>

      <p className="text-gray-700 text-lg mb-4 text-center">
        Your order has been received
      </p>

      <p className="text-gray-500 mb-8 text-center">
        You will receive an email with your order details shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/my-orders")}
          className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Go to My Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
