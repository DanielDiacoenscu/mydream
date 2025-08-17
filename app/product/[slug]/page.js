'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { itemCount } = useCart();
    return (
      <header className="sticky top-0 z-10 bg-black bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-gray-800">
          <div className="flex-1"></div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-pink-500">
              <a href="/">MyDream Beauty</a>
            </h1>
            <p className="text-sm text-gray-400 mt-1">Inspired by Excellence</p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {itemCount}
                    </span>
                )}
            </div>
          </div>
        </div>
      </header>
    );
};

export default function ProductPage({ params }) {
    const { slug } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`);
                if (!res.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const jsonResponse = await res.json();
                if (jsonResponse.data && jsonResponse.data.length > 0) {
                    setProduct(jsonResponse.data[0]);
                } else {
                    throw new Error('Product not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) return <div className="bg-black min-h-screen text-white text-center p-10">Loading...</div>;
    if (error) return <div className="bg-black min-h-screen text-white text-center p-10">Error: {error}</div>;
    if (!product) return <div className="bg-black min-h-screen text-white text-center p-10">Product not found.</div>;

    const { name, Description, Price, Images } = product.attributes;
    const imageUrl = Images?.data?.[0]?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Images.data[0].attributes.url}`
        : 'https://placehold.co/600x800';

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-pink-400">{name}</h1>
                        <p className="text-2xl text-gray-200 mt-2">${Price}</p>
                        <p className="text-gray-400 mt-4">{Description}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-6 bg-pink-500 text-white py-3 px-6 rounded-md hover:bg-pink-600 transition-colors duration-300 font-semibold"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}