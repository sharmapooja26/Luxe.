import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Layout/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Cart from "./components/Cart/CartContents";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />

        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />

            {/* COLLECTION */}
            <Route path="collections" element={<CollectionPage />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />

            {/* PRODUCT DETAILS */}
            <Route path="product/:id" element={<ProductDetails />} />

            {/* CART */}
            <Route path="cart" element={<Cart />} />

            {/* CHECKOUT */}
            <Route path="checkout" element={<Checkout />} />

            {/* ORDER CONFIRMATION ROUTES */}
            {/* Safe fallback route if no ID */}
            <Route
              path="order-confirmation"
              element={
                <div className="text-center mt-20 text-gray-600">
                  Order ID missing. Please go back to{" "}
                  <a href="/" className="text-blue-600 underline">
                    Home
                  </a>
                  .
                </div>
              }
            />

            {/* Dynamic order confirmation route */}
            <Route
              path="order-confirmation/:id"
              element={<OrderConfirmationPage />}
            />

            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="products/add" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
