'use client';

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- PERSISTENCE LOGIC ---
  // On initial load, try to get the cart from localStorage.
  useEffect(() => {
    const storedCart = localStorage.getItem('mydream_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  // Whenever the cart changes, save it to localStorage.
  useEffect(() => {
    // We don't want to save the initial empty array on the first render.
    if (cart.length > 0) {
        localStorage.setItem('mydream_cart', JSON.stringify(cart));
    } else {
        // If the cart becomes empty, remove it from storage.
        localStorage.removeItem('mydream_cart');
    }
  }, [cart]); // This runs every time the 'cart' state changes.
  // --- END PERSISTENCE LOGIC ---

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    openCart();
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const itemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    itemCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};