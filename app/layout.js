import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext'; // <-- Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyDream Beauty',
  description: 'Inspired by Excellence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire application with the provider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}