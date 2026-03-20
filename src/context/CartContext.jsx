import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color,
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }

      return [...prev, product];
    });
  };

  const increaseQty = (id, size, color) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id, size, color) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item._id === id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id, size, color) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          !(item._id === id && item.size === size && item.color === color),
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
