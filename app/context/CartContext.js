'use client';

import React, { createContext, useState, useContext } from 'react';

// Create the context with a default undefined value
const CartContext = createContext(undefined);

// Create the Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Prevent adding duplicates, or handle quantity later
    setCart((prevCart) => {
      // Simple version: just add the product
      return [...prevCart, product];
    });
  };

  const itemCount = cart.length;

  // The value that will be available to all consuming components
  const value = { cart, addToCart, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Create the custom hook for easy consumption
export const useCart = () => {
  const context = useContext(CartContext);
  // This check is crucial. If a component outside the provider calls this, it will throw a clear error.
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};