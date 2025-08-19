import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';
import CartPanel from './components/CartPanel'; // <-- IMPORT THE PANEL

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyDream Beauty',
  description: 'Inspired by Excellence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartPanel /> {/* <-- RENDER THE PANEL HERE */}
        </CartProvider>
      </body>
    </html>
  );
}