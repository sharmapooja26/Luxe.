import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const userOrders = allOrders[user.email] || [];

    const foundOrder = userOrders.find((o) => o._id === id || o.id === id);

    setOrderDetails(foundOrder);
  }, [id, navigate]);

  if (!orderDetails) {
    return (
      <p className="p-6 text-center text-gray-500">No order details found.</p>
    );
  }

  const items =
    orderDetails.orderItems ||
    orderDetails.items ||
    orderDetails.products ||
    [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-black mb-10 tracking-tight">
        Order Details
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-10">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 border-b pb-6">
          <div>
            <h3 className="text-xl font-semibold text-black">
              Order #{orderDetails._id || orderDetails.id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Status Buttons */}
          <div className="flex gap-3">
            <span
              className={`px-2 py-1.5 text-xs font-medium border rounded-md transition ${
                orderDetails.isPaid
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {orderDetails.isPaid ? "Paid" : "Pending"}
            </span>

            <span className="px-2 py-1.5 text-xs font-medium border border-black text-black rounded-md hover:bg-black hover:text-white transition">
              {orderDetails.status || "Processing"}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid sm:grid-cols-2 gap-8 text-sm">
          <div className="bg-gray-50 p-5 rounded-lg border">
            <h4 className="font-semibold text-black mb-3">Payment</h4>
            <p className="text-gray-700">
              {orderDetails.paymentMethod || "Not specified"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {orderDetails.isPaid ? "Paid successfully" : "Not paid yet"}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border">
            <h4 className="font-semibold text-black mb-3">Shipping</h4>
            <p className="text-gray-700">
              {orderDetails.shippingMethod || "Standard"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {orderDetails.shippingAddress?.city},{" "}
              {orderDetails.shippingAddress?.country}
            </p>
          </div>
        </div>

        {/* Items */}
        <div>
          <h4 className="font-semibold text-black mb-5 text-lg">Items</h4>

          {items.length > 0 ? (
            <div className="divide-y">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 py-5 hover:bg-gray-50 transition rounded-lg px-2"
                >
                  {/* Image */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center border rounded-lg text-xs text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ${item.price} × {item.quantity || item.qty || 1}
                    </p>
                  </div>

                  {/* Total */}
                  <p className="text-sm font-semibold text-black">
                    ${item.price * (item.quantity || item.qty || 1)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm py-6">
              No items found in this order.
            </p>
          )}
        </div>

        {/* Back Button */}
        <div className="pt-6 border-t text-center">
          <Link
            to="/my-orders"
            className="inline-block px-6 py-2 text-sm font-medium border border-black text-black rounded-md hover:bg-black hover:text-white transition"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
