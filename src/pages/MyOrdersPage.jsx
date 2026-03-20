import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const userOrders = allOrders[user.email] || [];
    setOrders(userOrders);
  }, [navigate]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-black text-center">
        My Orders
      </h2>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Shipping</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => {
              const items =
                order.orderItems || order.items || order.products || [];

              const firstItem = items[0];

              return (
                <tr
                  key={order._id || order.id}
                  onClick={() => handleRowClick(order._id || order.id)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  {/*IMAGE COLUMN */}
                  <td className="px-6 py-5">
                    {firstItem?.image ? (
                      <img
                        src={firstItem.image}
                        alt={firstItem.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center border rounded-md text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>

                  {/* Order ID */}
                  <td className="px-6 py-5 font-medium text-black">
                    #{order._id || order.id}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Shipping */}
                  <td className="px-6 py-5 text-gray-700">
                    <p className="text-sm font-medium text-black">
                      {order.shippingAddress?.city || "—"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.shippingAddress?.country || ""}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-5">
                    {items.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {items.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs text-gray-700">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              x{item.quantity || item.qty || 1}
                            </span>
                          </div>
                        ))}

                        {items.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{items.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No items</span>
                    )}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-5 font-semibold text-black">
                    ₹{order.totalPrice || order.total || 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
