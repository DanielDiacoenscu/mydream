'use client';

import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If it exists, increase the quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If it's a new item, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    console.log('Added to cart:', product.attributes.name);
  };

  // We will add more functions here later (remove, update, etc.)

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useCart = () => {
  return useContext(CartContext);
};