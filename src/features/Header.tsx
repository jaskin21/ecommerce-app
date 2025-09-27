import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderCart from './ui/HeaderCart';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const location = useLocation();

  // const isActive = (path: string) =>
  //   location.pathname === path
  //     ? 'block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'
  //     : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';

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
              <Link to='/shop' className='hover:text-black transition'>
                Shop
              </Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-black transition'>
                About
              </Link>
            </li>
            <li>
              <Link to='/faq' className='hover:text-black transition'>
                FAQ
              </Link>
            </li>
            <li>
              <Link to='/gift-card' className='hover:text-black transition'>
                Gift Card
              </Link>
            </li>
            <li>
              <Link to='/contact' className='hover:text-black transition'>
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
            <HeaderCart />

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
              <Link to='/shop' onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
              <Link to='/about' onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to='/faq' onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>
              <Link to='/gift-card' onClick={() => setMenuOpen(false)}>
                Gift Card
              </Link>
              <Link to='/contact' onClick={() => setMenuOpen(false)}>
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
