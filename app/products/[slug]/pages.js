import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // --- THIS IS THE FIX ---
  // We are now using the correct, case-sensitive field names from your Strapi API.
  const { name, Description, Price, Images, slug } = product.attributes;

  const imageUrl = Images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Images.data[0].attributes.url}`
    : 'https://placehold.co/600x400';

  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
        <div className="w-full h-64 bg-gray-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
          />
        </div>
        <div className="p-4 text-white flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-pink-400">
            {name}
          </h3>
          <p className="mt-1 text-sm text-gray-400 flex-grow">{Description}</p>
          <p className="mt-2 text-base font-medium text-gray-200">${Price}</p>
        </div>
      </div>
    </Link>
  );
};

// Main HomePage component that fetches and displays products
export default async function HomePage() {
  let products = [];
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const jsonResponse = await res.json();
    products = jsonResponse.data || [];
  } catch (e) {
    console.error(e);
    error = e.message;
  }

 return (
    <div className="bg-black min-h-screen text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-tight text-pink-500 text-center">
          MyDream Beauty
        </h1>
        <p className="text-center text-gray-400 mt-2">Inspired by Excellence</p>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {error ? (
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-semibold">Failed to Load Products</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
            {products.length > 0 ? (
              products
                .filter(product => product && product.attributes)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products available at the moment.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
