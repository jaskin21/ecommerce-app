import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SocialIcons from '../../components/home/SocialIcon';
import { CartProvider } from '../../context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <Header />
      <Outlet />
      <SocialIcons />
      <Footer />
    </CartProvider>
  );
}
