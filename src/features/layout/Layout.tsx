import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SocialIcons from '../../components/home/SocialIcon';

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <SocialIcons />
      <Footer />
    </div>
  );
}
