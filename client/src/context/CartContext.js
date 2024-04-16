import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : { waitingItems: [], orderedItems: [] };
    } catch (error) {
      console.error("Failed to retrieve cart from localStorage:", error);
      return { waitingItems: [], orderedItems: [] };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = {
        ...prevCart,
        waitingItems: [...prevCart.waitingItems, item],
      };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newWaitingItems = prevCart.waitingItems.filter((item) => item.id !== itemId);
      const newCart = {
        ...prevCart,
        waitingItems: newWaitingItems,
      };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    setCart((prevCart) => {
      const newWaitingItems = prevCart.waitingItems.map((item) =>
        item.id === itemId ? { ...item, cantitate: newQuantity } : item
      );
      return { ...prevCart, waitingItems: newWaitingItems };
    });
  };

  const processOrder = () => {
    setCart((prevCart) => {
      const newCart = {
        waitingItems: [],
        orderedItems: [...prevCart.orderedItems, ...prevCart.waitingItems],
      };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateItemQuantity, processOrder }}>
      {children}
    </CartContext.Provider>
  );
};
