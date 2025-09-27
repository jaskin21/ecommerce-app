import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SocialIcons from '../../components/home/SocialIcon';
import { CartProvider } from '../../context/CartContext';
import { useShopStore } from '../../stores/useProductStore';
import { useEffect } from 'react';

export default function Layout() {
  const fetchProducts = useShopStore((s) => s.fetchProducts);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <CartProvider>
      <Header />
      <Outlet />
      <SocialIcons />
      <Footer />
    </CartProvider>
  );
}
