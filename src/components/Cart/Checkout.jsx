import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const products = cartItems || [];

  const cart = {
    products,
    totalPrice: products.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    ),
  };

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;
    const allAddresses = JSON.parse(localStorage.getItem("addresses")) || {};
    if (allAddresses[user.email]?.length > 0) {
      setSavedAddresses(allAddresses[user.email]);
      setShippingAddress(allAddresses[user.email][0]);
    }
  }, [user]);

  const handleAddressSelect = (index) => {
    setShippingAddress(savedAddresses[index]);
  };

  const handleChange = (e) =>
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });

  const handlePaymentSuccess = () => {
    if (!user) return alert("Please login to place order");
    if (cart.products.length === 0) return alert("Cart is empty!");

    const newOrder = {
      _id: Date.now().toString(),
      createdAt: new Date(),
      shippingAddress,
      items: cart.products.map((p) => ({
        id: p._id,
        name: p.name,
        quantity: p.quantity || 1,
        price: p.price,
        color: p.color,
        size: p.size,
        image: p.image || (Array.isArray(p.images) ? p.images[0]?.url : null),
      })),
      total: cart.totalPrice,
    };

    // Save order in localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};

    if (!allOrders[user.email]) {
      allOrders[user.email] = [];
    }

    allOrders[user.email].push(newOrder);

    localStorage.setItem("orders", JSON.stringify(allOrders));
    // Save address
    const allAddresses = JSON.parse(localStorage.getItem("addresses")) || {};
    if (!allAddresses[user.email]) allAddresses[user.email] = [];
    const exists = allAddresses[user.email].some(
      (a) => a.address === shippingAddress.address,
    );
    if (!exists) allAddresses[user.email].push(shippingAddress);
    localStorage.setItem("addresses", JSON.stringify(allAddresses));

    // Clear cart
    setCartItems([]);
    const cartKey = `cart_${user.email}`;
    localStorage.removeItem(cartKey);

    toast.success("Order placed successfully!");

    navigate(`/order-confirmation/${newOrder._id}`, {
      state: { order: newOrder },
    });
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">Please login to continue checkout</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      {/* LEFT */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        {savedAddresses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select Address</h3>
            {savedAddresses.map((addr, i) => (
              <div
                key={i}
                className={`border p-3 rounded mb-2 cursor-pointer ${
                  addr.address === shippingAddress.address
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleAddressSelect(i)}
              >
                {addr.firstName} {addr.lastName}, {addr.address}, {addr.city},{" "}
                {addr.country}, {addr.postalCode}, {addr.phone}
              </div>
            ))}
          </div>
        )}

        <h3 className="text-lg font-medium mb-4">
          {savedAddresses.length > 0
            ? "Edit / Add Address"
            : "Delivery Address"}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={shippingAddress.firstName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={shippingAddress.lastName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <input
          name="phone"
          placeholder="Phone"
          value={shippingAddress.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
        />

        <button
          onClick={handlePaymentSuccess}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Pay ${cart.totalPrice}
        </button>
      </div>

      {/* RIGHT */}
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

        {cart.products.map((p, i) => (
          <div key={i} className="flex items-center gap-4 mb-4 border-b pb-4">
            <img src={p.image} alt={p.name} className="w-16 h-16 rounded" />
            <div className="flex-1">
              <h4 className="font-medium">{p.name}</h4>
              <p className="text-sm text-gray-500">
                Size: {p.size} | Color: {p.color}
              </p>
            </div>
            <p>${p.price}</p>
          </div>
        ))}

        <div className="flex justify-between mt-6 text-lg font-semibold">
          <span>Total</span>
          <span>${cart.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
