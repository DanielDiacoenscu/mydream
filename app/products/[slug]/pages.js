'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

// Function to fetch a single product by its slug
async function getProduct(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // We use Strapi's filtering system to find the product with the matching slug
  const res = await fetch(`${apiUrl}/api/products?filters[slug][$eq]=${slug}&populate=*`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const jsonResponse = await res.json();
  // The response will be an array, so we take the first item
  if (jsonResponse.data && jsonResponse.data.length > 0) {
    return jsonResponse.data[0];
  } else {
    return null; // Or handle as a "not found" case
  }
}

// The main page component - NOW A CLIENT COMPONENT
export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // <-- Access the addToCart function

  useEffect(() => {
    async function getProduct(slug) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const res = await fetch(`${apiUrl}/api/products?filters[slug][$eq]=${slug}&populate=*`);

        if (!res.ok) throw new Error('Failed to fetch product');
        
        const jsonResponse = await res.json();
        if (jsonResponse.data && jsonResponse.data.length > 0) {
          setProduct(jsonResponse.data[0]);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    getProduct(params.slug);
  }, [params.slug]);

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <h1 className="text-3xl text-red-500">{error}</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  const { name, description, price, images } = product.attributes;
  const imageUrl = images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${images.data[0].attributes.url}`
    : 'https://placehold.co/600x400';

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${name} has been added to your bag!`); // Simple confirmation for now
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-4xl font-bold tracking-tight text-pink-400">{name}</h1>
            <p className="mt-4 text-3xl text-gray-200">${price}</p>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-400">{description}</p>
            </div>
            <div className="mt-auto pt-8">
              <button
                onClick={handleAddToCart} // <-- This now calls our function
                className="w-full bg-pink-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-colors"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

  const { name, description, price, images } = product.attributes;
  const imageUrl = images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${images.data[0].attributes.url}`
    : 'https://placehold.co/600x400';

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-4xl font-bold tracking-tight text-pink-400">{name}</h1>
            <p className="mt-4 text-3xl text-gray-200">${price}</p>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-400">{description}</p>
            </div>
            <div className="mt-auto pt-8">
              <button
                type="submit"
                className="w-full bg-pink-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-colors"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );