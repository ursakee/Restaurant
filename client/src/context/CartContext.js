import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, cantitate: newQuantity };
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
