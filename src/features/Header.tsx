import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderCart from './ui/HeaderCart';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? 'opacity-50 cursor-default' // 👈 active style
      : 'hover:text-black transition';

  return (
    <header className='border-b shadow-sm pt-2 pb-4 sticky top-0 bg-white z-40'>
      <nav className='max-w-screen-xl mx-auto px-6 py-3'>
        {/* TOP ROW */}
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='flex flex-col leading-tight'>
            <span className='text-4xl font-bold tracking-wide'>JAS</span>
            <span className='text-sm text-gray-500'>Aesthetic Products</span>
          </Link>

          {/* --- NAV LINKS (desktop only ≥1024px) --- */}
          <ul className='hidden lg:flex gap-8 text-gray-700 font-medium'>
            <li>
              <Link to='/shop' className={isActive('/shop')}>
                Shop
              </Link>
            </li>
            <li>
              <Link to='/about' className={isActive('/about')}>
                About
              </Link>
            </li>
            <li>
              <Link to='/faq' className={isActive('/faq')}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to='/gift-card' className={isActive('/gift-card')}>
                Gift Card
              </Link>
            </li>
            <li>
              <Link to='/contact' className={isActive('/contact')}>
                Contact
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className='flex items-center gap-4'>
            {/* Search (visible on tablet+desktop ≥640px) */}
            <form className='hidden md:flex'>
              <div className='relative'>
                <input
                  type='search'
                  placeholder='Search products...'
                  className='block w-full p-3 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                />
                <div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 20 20'
                  >
                    <path d='M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z' />
                  </svg>
                </div>
              </div>
            </form>

            {/* Login (visible on tablet+desktop ≥640px) */}
            <Link
              to='/login'
              className='hidden md:flex items-center gap-1 text-gray-700 hover:text-black transition'
            >
              <User size={20} />
              <span>Login</span>
            </Link>

            {/* Cart always visible */}
            {location.pathname !== '/cart' && <HeaderCart />}

            {/* Burger menu toggle: visible when <lg (so tablet & mobile) */}
            <button
              className='lg:hidden'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* SEARCH BAR (mobile only <640px) */}
        <form className='mt-3 md:hidden'>
          <div className='relative'>
            <input
              type='search'
              placeholder='Search products...'
              className='block w-full p-3 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            />
            <div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 20 20'
              >
                <path d='M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z' />
              </svg>
            </div>
          </div>
        </form>

        {/* MOBILE MENU (Framer Motion) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='mt-4 lg:hidden flex flex-col gap-4 text-gray-700 font-medium'
            >
              {/* Login only for mobile (<640px) */}
              <div className='md:hidden'>
                <Link
                  to='/login'
                  className='flex items-center gap-1'
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
              </div>

              {/* Nav links */}
              <Link
                to='/shop'
                onClick={() => setMenuOpen(false)}
                className={isActive('/shop')}
              >
                Shop
              </Link>

              <Link
                to='/about'
                onClick={() => setMenuOpen(false)}
                className={isActive('/about')}
              >
                About
              </Link>

              <Link
                to='/faq'
                onClick={() => setMenuOpen(false)}
                className={isActive('/faq')}
              >
                FAQ
              </Link>

              <Link
                to='/gift-card'
                onClick={() => setMenuOpen(false)}
                className={isActive('/gift-card')}
              >
                Gift Card
              </Link>

              <Link
                to='/contact'
                onClick={() => setMenuOpen(false)}
                className={isActive('/contact')}
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
