'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';

// --- Cart Icon Component ---
const CartIcon = () => {
  const { itemCount, openCart } = useCart(); // <-- Get openCart function
  return (
    <div className="relative cursor-pointer" onClick={openCart}> {/* <-- Add onClick */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
          {itemCount}
        </span>
      )}
    </div>
  );
};

// --- Header Component ---
const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-black bg-opacity-80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-gray-800">
        <div className="flex-1"></div>
        <div className="text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold tracking-tight text-pink-500">
              MyDream Beauty
            </h1>
          </Link>
          <p className="text-sm text-gray-400 mt-1">Inspired by Excellence</p>
        </div>
        <div className="flex-1 flex justify-end">
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

// --- FINAL ADAPTED Product Card Component ---
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) return null;
  const { name, Description, Price, Images, slug } = product;
  const imageUrl = Images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Images.data[0].attributes.url}`
    : 'https://placehold.co/600x400';

  return (
    <div className="group relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/product/${slug}`} className="block">
        <div className="w-full h-64 bg-gray-700 overflow-hidden">
          <img src={imageUrl} alt={name || 'Product Image'} className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="p-4 text-white flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-pink-400">
          <Link href={`/product/${slug}`}>{name || 'Unnamed Product'}</Link>
        </h3>
        <p className="mt-1 text-sm text-gray-400 flex-grow">{Description}</p>
        <div className="mt-4 flex justify-between items-center">
            <p className="text-base font-medium text-gray-200">${Price || '0.00'}</p>
            <button onClick={() => addToCart(product)} className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300 text-sm font-semibold">
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const jsonResponse = await res.json();
        setProducts(jsonResponse.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Failed to load products: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}