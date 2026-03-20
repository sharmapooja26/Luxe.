import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 123123,
      user: { name: "John Doe" },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123124,
      user: { name: "Jane Smith" },
      totalPrice: 250,
      status: "Shipped",
    },
    {
      _id: 123125,
      user: { name: "Alex Johnson" },
      totalPrice: 75,
      status: "Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Revenue</h2>
          <p className="text-2xl font-semibold text-gray-900">$100,000</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Total Orders
          </h2>
          <p className="text-2xl font-semibold text-gray-900">200</p>
          <Link
            to="/admin/orders"
            className="mt-2 inline-block text-sm font-medium text-gray-800 hover:text-black underline"
          >
            Manage Orders
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Total Products
          </h2>
          <p className="text-2xl font-semibold text-gray-900">100</p>
          <Link
            to="/admin/products"
            className="mt-2 inline-block text-sm font-medium text-gray-800 hover:text-black underline"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">{order.user.name}</td>
                    <td className="py-3 px-4">${order.totalPrice}</td>
                    <td className="py-3 px-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
