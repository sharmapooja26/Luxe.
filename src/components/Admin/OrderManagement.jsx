import React, { useState, useEffect } from "react";

const OrderManagement = () => {
  const defaultOrders = [
    {
      id: "667540cec337612fc35b0cd6",
      customer: "Admin User",
      total: 199.96,
      status: "Delivered",
    },
    {
      id: "667540d3c3c67bc7e4e34e002",
      customer: "Admin User",
      total: 40,
      status: "Processing",
    },
    {
      id: "6675bf2c7ca77be33cefb318",
      customer: "Admin User",
      total: 30.99,
      status: "Processing",
    },
    {
      id: "6675c24bcb038827904bc5ec1",
      customer: "Admin User",
      total: 30.99,
      status: "Processing",
    },
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};

    // ✅ Convert object → flat array
    const allOrders = Object.entries(storedOrders).flatMap(
      ([email, userOrders]) =>
        userOrders.map((order) => ({
          id: order._id,
          customer: email,
          total: order.totalPrice,
          status: order.status || "Processing",
        })),
    );

    if (allOrders.length > 0) {
      setOrders(allOrders);
    } else {
      setOrders(defaultOrders);
    }
  }, []);

  // ✅ Update back to original structure
  const updateOrderInStorage = (updatedOrdersFlat) => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};

    const newOrders = {};

    Object.keys(storedOrders).forEach((email) => {
      newOrders[email] = storedOrders[email].map((order) => {
        const updated = updatedOrdersFlat.find((o) => o.id === order._id);
        return updated ? { ...order, status: updated.status } : order;
      });
    });

    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;

    setOrders(updatedOrders);
    updateOrderInStorage(updatedOrders);
  };

  const markAsDelivered = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = "Delivered";

    setOrders(updatedOrders);
    updateOrderInStorage(updatedOrders);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>

                <td className="py-3 px-4">{order.customer}</td>

                <td className="py-3 px-4">${order.total}</td>

                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="py-3 px-4 flex gap-2">
                  {/* Shipped */}
                  <button
                    onClick={() => handleStatusChange(index, "Shipped")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Shipped
                  </button>

                  {/* Delivered */}
                  <button
                    onClick={() => handleStatusChange(index, "Delivered")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delivered
                  </button>

                  {/* Cancelled */}
                  <button
                    onClick={() => handleStatusChange(index, "Cancelled")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancelled
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
