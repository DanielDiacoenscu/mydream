'use client';

import { useCart } from '../context/CartContext';

const CartPanel = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const imageUrl = (Images) => 
    Images?.data?.[0]?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Images.data[0].attributes.url}`
      : 'https://placehold.co/100x100';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeCart}></div>
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-pink-400">Shopping Cart</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="-m-2 p-2 text-gray-400 hover:text-white" onClick={closeCart}>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-700">
                    {cart.length > 0 ? (
                      cart.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                            <img src={imageUrl(product.Images)} alt={product.name} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-white">
                                <h3>{product.name}</h3>
                                <p className="ml-4">${(product.Price * product.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-400">Qty {product.quantity}</p>
                              <div className="flex">
                                <button onClick={() => removeFromCart(product.id)} type="button" className="font-medium text-pink-500 hover:text-pink-400">Remove</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-center text-gray-400">Your cart is empty.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-white">
                <p>Subtotal</p>
                <p>${cartTotal}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;