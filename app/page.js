// import React from 'react';
// import Link from 'next/link';

// const ProductCard = ({ product }) => {
//   const { name, description, price, images, slug } = product.attributes;
//   const imageUrl = images?.data?.[0]?.attributes?.url
//     ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${images.data[0].attributes.url}`
//     : 'https://placehold.co/600x400';

//   return (
//     <Link href={`/product/${slug}`} className="group block">
//       <div className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
//         <div className="w-full h-64 bg-gray-700 overflow-hidden">
//           <img
//             src={imageUrl}
//             alt={name}
//             className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
//           />
//         </div>
//         <div className="p-4 text-white flex-grow flex flex-col">
//           <h3 className="text-lg font-semibold text-pink-400">
//             {name}
//           </h3>
//           <p className="mt-1 text-sm text-gray-400 flex-grow">{description}</p>
//           <p className="mt-2 text-base font-medium text-gray-200">${price}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Main HomePage component that fetches and displays products
// export default async function HomePage() {
//   let products = [];
//   let error = null;

//   try {
//     // Fetch products from the live Strapi API
//     // The 'populate=*' query parameter ensures that all related fields, like images, are included in the response
//    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`, { 
//     next: { revalidate: 60 } // Revalidate every 60 seconds
//       });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
//     }

//     const jsonResponse = await res.json();
//     products = jsonResponse.data || [];
//   } catch (e) {
//     console.error(e);
//     error = e.message;
//   }

//  return (
//     <div className="bg-black min-h-screen text-white">
//       <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
//         <h1 className="text-3xl font-bold tracking-tight text-pink-500 text-center">
//           MyDream Beauty
//         </h1>
//         <p className="text-center text-gray-400 mt-2">Inspired by Excellence</p>
//       </header>
//       <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         {error ? (
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-semibold">Failed to Load Products</h2>
//             <p>{error}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
//             {products.length > 0 ? (
//               products
//                 .filter(product => product && product.attributes) // <-- THIS IS THE FIX
//                 .map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500">No products available at the moment.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// TEMPORARY DIAGNOSTIC PAGE
// import React from 'react';

// export default async function HomePage() {
//   let products = [];
//   let error = null;
//   let rawResponse = null;

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`, { 
//       next: { revalidate: 0 } // Disable cache for this test
//     });

//     rawResponse = await res.text(); // Get the raw text response

//     if (!res.ok) {
//       throw new Error(`API responded with status: ${res.status} ${res.statusText}`);
//     }

//     const jsonResponse = JSON.parse(rawResponse); // Parse the text
//     products = jsonResponse.data || [];

//   } catch (e) {
//     console.error(e);
//     error = e.message;
//   }

//  return (
//     <div className="bg-black min-h-screen text-white font-mono p-8">
//       <header className="pb-4 border-b border-gray-700">
//         <h1 className="text-2xl text-pink-500">Frontend Diagnostic Panel</h1>
//         <p className="text-gray-400">Status of Strapi API Connection</p>
//       </header>
      
//       <div className="mt-6">
//         <h2 className="text-lg text-cyan-400">1. Connection Status</h2>
//         {error ? (
//           <div className="mt-2 p-4 bg-red-900 border border-red-700 rounded">
//             <p className="font-bold text-red-300">CONNECTION FAILED</p>
//             <p className="mt-1 text-red-400">{error}</p>
//           </div>
//         ) : (
//           <div className="mt-2 p-4 bg-green-900 border border-green-700 rounded">
//             <p className="font-bold text-green-300">CONNECTION SUCCESSFUL</p>
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <h2 className="text-lg text-cyan-400">2. Data Analysis</h2>
//         <p className="mt-2 text-gray-300">Products found: <span className="font-bold text-yellow-400">{products.length}</span></p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-lg text-cyan-400">3. Raw API Response</h2>
//         <pre className="mt-2 p-4 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 overflow-x-auto">
//           <code>
//             {rawResponse ? rawResponse : "No response received."}
//           </code>
//         </pre>
//       </div>
//     </div>
//   );
// }

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